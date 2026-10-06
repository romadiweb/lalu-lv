import { readFile } from "node:fs/promises";
import process from "node:process";
import pg from "pg";

const { Client } = pg;

const categories = [
  {
    slug: "peles",
    name: "Peles",
    description: "Roku darinātas peles ar raksturu.",
    image_url: "/images/category-icons/peles-warm.png",
    image_alt: "Pelēka tamborēta pele",
    tone: "lavender",
  },
  {
    slug: "rotallietas",
    name: "Rotaļlietas",
    description: "Mīksti, koši un bērniem draudzīgi darbi.",
    image_url: "/images/category-icons/rotallietas-warm.png",
    image_alt: "Tamborēts lācis, zaķis un koka grabulis",
    tone: "cream",
  },
  {
    slug: "cepures",
    name: "Cepures",
    description: "Siltas sezonas izvēles katrai dienai.",
    image_url: "/images/category-icons/cepures-warm.png",
    image_alt: "Krēmīga adīta cepure ar bumbuli",
    tone: "warm",
  },
  {
    slug: "cimdi",
    name: "Cimdi",
    description: "Adīti pāri ar amatnieces rokrakstu.",
    image_url: "/images/category-icons/cimdi-warm.png",
    image_alt: "Gaiši adīti cimdi",
    tone: "lavender",
  },
  {
    slug: "mauci-jeb-durgali",
    name: "Mauči jeb dūrgaļi",
    description: "Praktiski un dekoratīvi plaukstu sildītāji.",
    image_url: "/images/category-icons/mauci-jeb-durgali-warm.png",
    image_alt: "Rakstaini vilnas mauči",
    tone: "cream",
  },
  {
    slug: "atstarotaji",
    name: "Latviski darbi / Atstarotāji",
    description: "Gaismai, drošībai un latviskai noskaņai.",
    image_url: "/images/category-icons/atstarotaji-warm.png",
    image_alt: "Latviskas lentītes emblēma",
    tone: "warm",
  },
  {
    slug: "atslegu-piekarini",
    name: "Dažādi",
    description: "Nelieli atradumi un dāvanu nieki.",
    image_url: "/images/category-icons/dazadi-warm.png",
    image_alt: "Rokdarbu sirds, zieds un smaržu maisiņš",
    tone: "lavender",
  },
  {
    slug: "magnetini",
    name: "Magnētiņi",
    description: "Mazie piemiņas darbi ikdienai.",
    image_url: "/images/category-icons/magnetini-warm.png",
    image_alt: "Koka sirds magnētiņi",
    tone: "cream",
  },
  {
    slug: "pasutijumi",
    name: "Pasūtījumi",
    description: "Individuāli darinājumi pēc vienošanās.",
    image_url: "/images/category-icons/pasutijumi-warm.png",
    image_alt: "Tamborētu rokdarbu kompozīcija",
    tone: "warm",
  },
  {
    slug: "fantazijas-ziedi",
    name: "Fantāzijas ziedi",
    description: "Ziedi, kuri paliek ilgāk par sezonu.",
    image_url: "/images/category-icons/fantazijas-ziedi-warm.png",
    image_alt: "Maigi rozā fantāzijas zieds",
    tone: "lavender",
  },
];

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  console.error("Missing SUPABASE_DATABASE_URL.");
  process.exit(1);
}

const products = JSON.parse(await readFile(".tmp-old-products.json", "utf8"));
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

try {
  await client.query("begin");

  const categoryIds = new Map();
  for (const [index, category] of categories.entries()) {
    const result = await client.query(
      `insert into public.shop_categories
        (slug, name, description, image_url, image_alt, tone, sort_order, is_active)
       values ($1, $2, $3, $4, $5, $6, $7, true)
       on conflict (slug) do update set
        name = excluded.name,
        description = excluded.description,
        image_url = excluded.image_url,
        image_alt = excluded.image_alt,
        tone = excluded.tone,
        sort_order = excluded.sort_order,
        is_active = true
       returning id`,
      [
        category.slug,
        category.name,
        category.description,
        category.image_url,
        category.image_alt,
        category.tone,
        index,
      ],
    );
    categoryIds.set(category.slug, result.rows[0].id);
  }

  for (const [index, product] of products.entries()) {
    const productResult = await client.query(
      `insert into public.shop_products
        (external_id, slug, name, short_description, price_cents, currency, status, stock_status, sort_order, old_url, published_at)
       values ($1, $2, $3, $4, $5, 'EUR', $6, $7, $8, $9, now())
       on conflict (external_id) do update set
        slug = excluded.slug,
        name = excluded.name,
        short_description = excluded.short_description,
        price_cents = excluded.price_cents,
        status = excluded.status,
        stock_status = excluded.stock_status,
        sort_order = excluded.sort_order,
        old_url = excluded.old_url,
        published_at = excluded.published_at
       returning id`,
      [
        product.externalId,
        product.slug,
        product.name,
        product.shortDescription,
        product.priceCents,
        product.status,
        product.stockStatus,
        index,
        product.oldUrl,
      ],
    );

    const productId = productResult.rows[0].id;
    const categoryId = categoryIds.get(product.categorySlug);
    if (categoryId) {
      await client.query(
        `insert into public.shop_product_categories
          (product_id, category_id, is_primary, sort_order)
         values ($1, $2, true, 0)
         on conflict (product_id, category_id) do update set
          is_primary = true,
          sort_order = 0`,
        [productId, categoryId],
      );
    }

    if (product.imageUrl) {
      await client.query(
        `insert into public.shop_product_images
          (product_id, url, alt, sort_order, is_primary)
         values ($1, $2, $3, 0, true)
         on conflict (product_id) where is_primary do update set
          url = excluded.url,
          alt = excluded.alt,
          sort_order = 0`,
        [productId, product.imageUrl, product.imageAlt || product.name],
      );
    }
  }

  await client.query("commit");
  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  await client.end();
}
