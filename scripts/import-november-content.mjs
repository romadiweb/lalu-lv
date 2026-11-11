import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import pg from "pg";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

// Preview by default. Apply after deploying public assets:
// node --env-file=.env.local scripts/import-november-content.mjs --apply
// Add --upload-images to publish photos to the existing CMS storage bucket first.
const update = process.argv.includes("--november-11") ? "2026-11-11" : "2026-11";
const content = JSON.parse(await readFile(new URL(`../data/content-updates/${update}.json`, import.meta.url), "utf8"));
const apply = process.argv.includes("--apply");
const productStatus = process.argv.includes("--draft") ? "draft" : "published";
const slugs = new Set();
for (const record of [...content.workshops, ...content.products]) {
  if (slugs.has(record.slug)) throw new Error(`Duplicate slug: ${record.slug}`);
  slugs.add(record.slug);
}
for (const asset of content.assets) {
  await access(new URL(`../public${asset.url}`, import.meta.url));
}
if (!apply) {
  console.log(JSON.stringify({ workshops: content.workshops.map(({slug,price_label}) => ({slug,price_label})), products: content.products.map(({slug,price_cents}) => ({slug,price_cents})), notes: content.notes }, null, 2));
  process.exit(0);
}
if (!process.env.SUPABASE_DATABASE_URL) throw new Error("Missing SUPABASE_DATABASE_URL.");
const storageKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const imageUrls = new Map();
if (process.argv.includes("--upload-images")) {
if (!storageKey || !process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Missing CMS storage configuration.");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, storageKey, { auth: { persistSession: false, autoRefreshToken: false } });
for (const asset of content.assets) {
  const bytes = await readFile(new URL(`../public${asset.url}`, import.meta.url));
  const digest = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
  const filePath = `content-updates/2026-11/${digest}-${asset.url.split("/").pop()}`;
  const { error } = await supabase.storage.from("cms-images").upload(filePath, bytes, { contentType: "image/jpeg", cacheControl: "31536000", upsert: false });
  if (error && error.message !== "The resource already exists") throw error;
  const { data } = supabase.storage.from("cms-images").getPublicUrl(filePath);
  const response = await fetch(data.publicUrl, { method: "HEAD" });
  if (!response.ok) throw new Error(`CMS image not accessible: ${asset.url}`);
  imageUrls.set(asset.url, data.publicUrl);
}
} else {
  for (const asset of content.assets) imageUrls.set(asset.url, asset.url);
  console.log("Using project image paths. Deploy public/images/updates-2026-11 before using these entries on the live site.");
}
const client = new pg.Client({ connectionString: process.env.SUPABASE_DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query("begin");
  const productSlugs = content.products.map(p => p.slug);
  const workshopSlugs = content.workshops.map(w => w.slug);
  const backup = {
    workshops: (await client.query("select * from public.workshops where slug = any($1::text[])", [workshopSlugs])).rows,
    products: (await client.query("select * from public.shop_products where slug = any($1::text[])", [productSlugs])).rows,
    images: (await client.query("select i.* from public.shop_product_images i join public.shop_products p on p.id=i.product_id where p.slug = any($1::text[])", [productSlugs])).rows,
    categories: (await client.query("select c.* from public.shop_product_categories c join public.shop_products p on p.id=c.product_id where p.slug = any($1::text[])", [productSlugs])).rows,
  };
  const backupDirectory = join(tmpdir(), "lalu-content-backups");
  await mkdir(backupDirectory, { recursive: true });
  await writeFile(join(backupDirectory, `november-${Date.now()}.json`), JSON.stringify(backup, null, 2));
  if (update === "2026-11-11") {
    await client.query(`insert into public.shop_categories (slug,name,parent_id,sort_order)
      select 'tamboreti-augli-un-partika','Tamborēti augļi un pārtika',id,100
      from public.shop_categories where slug='rotallietas'
      on conflict (slug) do nothing`);
  }
  const categories = new Map((await client.query("select slug,id from public.shop_categories")).rows.map(c => [c.slug,c.id]));
  for (const w of content.workshops) {
    await client.query(`insert into public.workshops (slug,title,intro,details,duration_label,price_label,travel_label,image_url,image_alt,cta_label,cta_href,status,sort_order)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'published',$12)
      on conflict (slug) do update set title=excluded.title,intro=excluded.intro,details=excluded.details,duration_label=excluded.duration_label,price_label=excluded.price_label,travel_label=excluded.travel_label,image_url=excluded.image_url,image_alt=excluded.image_alt,cta_label=excluded.cta_label,cta_href=excluded.cta_href,sort_order=excluded.sort_order`,
      [w.slug,w.title,w.intro,w.details,w.duration_label,w.price_label,w.travel_label,imageUrls.get(w.image_url),w.image_alt,w.cta_label,w.cta_href,w.sort_order]);
  }
  for (const p of content.products) {
    const categoryId = categories.get(p.category);
    if (!categoryId) throw new Error(`Missing category: ${p.category}`);
    const { rows: [product] } = await client.query(`insert into public.shop_products (slug,name,short_description,description,price_cents,currency,status,stock_status,is_washable,sort_order,published_at)
      values ($1,$2,$3,$4,$5,'EUR',$9,$8,$6,$7,case when $9 = 'published' then now() end)
      on conflict (slug) do update set name=excluded.name,short_description=excluded.short_description,description=excluded.description,price_cents=excluded.price_cents,is_washable=excluded.is_washable,
        status=case when shop_products.status='draft' and excluded.status='published' then 'published' else shop_products.status end,
        published_at=coalesce(shop_products.published_at,excluded.published_at)
      returning id`, [p.slug,p.name,p.short_description,p.description,p.price_cents,p.is_washable,p.sort_order,p.stock_status ?? "in_stock",productStatus]);
    await client.query(`insert into public.shop_product_categories (product_id,category_id,is_primary,sort_order) values ($1,$2,true,0)
      on conflict (product_id,category_id) do nothing`, [product.id, categoryId]);
    for (const [index,image] of p.images.entries()) {
      if (index===0) {
        await client.query(`insert into public.shop_product_images (product_id,url,alt,sort_order,is_primary) values ($1,$2,$3,0,true)
          on conflict (product_id) where is_primary do update set url=excluded.url,alt=excluded.alt`, [product.id,imageUrls.get(image.url),image.alt]);
      } else {
        await client.query(`insert into public.shop_product_images (product_id,url,alt,sort_order,is_primary)
          select $1,$2,$3,$4,false where not exists (select 1 from public.shop_product_images where product_id=$1 and url=$2)`, [product.id,imageUrls.get(image.url),image.alt,index]);
        if (imageUrls.get(image.url) !== image.url) {
          await client.query("delete from public.shop_product_images where product_id=$1 and url=$2 and not is_primary", [product.id,image.url]);
        }
      }
    }
  }
  const workshopCount = Number((await client.query("select count(*) from public.workshops where slug=any($1::text[])",[workshopSlugs])).rows[0].count);
  const productCount = Number((await client.query("select count(*) from public.shop_products where slug=any($1::text[])",[productSlugs])).rows[0].count);
  if (workshopCount!==content.workshops.length || productCount!==content.products.length) throw new Error("Import count mismatch");
  await client.query("commit");
  console.log(`Verified ${workshopCount} workshops and ${productCount} products. Backup saved in ${backupDirectory}.`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  await client.end();
}
