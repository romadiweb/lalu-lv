import type { ShopProduct } from "./shop";

export type ProductOption = {
  id: string;
  slug: string;
  name: string;
  color: string | null;
  giftBox: boolean;
  pack: string | null;
  price_cents: number | null;
  stock_status: ShopProduct["stock_status"];
  description: string | null;
  images: ShopProduct["images"];
};

type Family = { slug: string; name: string; color?: boolean; packs?: boolean };

function familyFor(product: ShopProduct): Family | null {
  const slug = product.slug;
  if (/^grabulis-pelite-(sarkanas|pelekas)-nr-\d/.test(slug)) return { slug: "grabulis-pelite", name: "Grabulītis “Pelīte”", color: true };
  if (/^grabulis-gliemezitis-nr-\d+$/.test(slug)) return { slug: "grabulis-gliemezitis", name: "Grabulītis “Gliemezītis”", color: true };
  if (/^davanu-komplekts-kengurs(?:-davanu-kastite)?$/.test(slug)) return { slug: "davanu-komplekts-kengurs", name: "Dāvanu komplekts jaundzimušajam “Ķengurs”" };
  if (/^grauzamrinkis-un-grabulitis-kakis-/.test(slug)) return { slug: "grauzamrinkis-un-grabulitis-kakis", name: "Graužamriņķis un grabulītis “Kaķis”", color: true };
  if (/^grauzamrinkis-un-grabulitis-pelite-/.test(slug)) return { slug: "grauzamrinkis-un-grabulitis-pelite", name: "Graužamriņķis un grabulītis “Pelīte”", color: true };
  if (/^engelisi-\d+-gab$/.test(slug)) return { slug: "engelisi", name: "Auduma eņģelīši", packs: true };
  if (/^dekorativas-senites-\d+-gab$/.test(slug)) return { slug: "dekorativas-senites", name: "Dekoratīvas sēnītes", packs: true };
  return null;
}

export function groupShopProducts(products: ShopProduct[]): ShopProduct[] {
  const groups = new Map<string, { family: Family | null; products: ShopProduct[] }>();
  const titleCounts = new Map<string, number>();
  for (const product of products) {
    const key = `${product.name}|${product.price_cents}|${product.currency}`;
    titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
  }
  for (const product of products) {
    const family = familyFor(product);
    const titleKey = `${product.name}|${product.price_cents}|${product.currency}`;
    const key = family?.slug ?? (titleCounts.get(titleKey)! > 1 ? `same:${titleKey}` : product.slug);
    const group = groups.get(key);
    if (group) group.products.push(product);
    else groups.set(key, { family, products: [product] });
  }
  return Array.from(groups.values(), ({ family, products: members }) => {
    const first = members.find(p => !p.slug.endsWith("-davanu-kastite") && p.stock_status !== "sold_out") ?? members[0];
    const images = Array.from(new Map(members.flatMap(p => p.images).map(image => [image.url, image])).values());
    const options: ProductOption[] = [];
    const seen = new Set<string>();
    for (const member of members) {
      // This older overview record has no specific colour; the colour-specific records provide its choices.
      if (family?.slug === "grauzamrinkis-un-grabulitis-pelite" && member.slug.endsWith("-berniem")) continue;
      const color = family?.color ? member.name.split(" — ")[1]?.replace(/, Nr\. \d+.*$/, "").trim() ?? null : null;
      const giftBox = member.slug.endsWith("-davanu-kastite");
      const pack = family?.packs ? member.name.split(" — ")[1] ?? null : null;
      const key = `${color}|${giftBox}|${pack}`;
      if (seen.has(key)) continue;
      seen.add(key);
      options.push({ id: member.id, slug: member.slug, name: member.name, color, giftBox, pack, price_cents: member.price_cents, stock_status: member.stock_status, description: member.description, images: member.images });
    }
    const priced = options.filter(option => option.price_cents !== null && option.stock_status !== "sold_out");
    const basePrice = priced.length ? Math.min(...priced.map(option => option.price_cents!)) : first.price_cents;
    return {
      ...first,
      slug: family?.slug ?? first.slug,
      name: family?.name ?? first.name,
      price_cents: basePrice,
      aliases: members.map(p => p.slug),
      options: family ? options : [],
      images,
      image: first.image,
      colors: Array.from(new Set(members.flatMap(p => p.colors))),
      categorySlugs: Array.from(new Set(members.flatMap(p => p.categorySlugs))),
      stock_status: members.every(p => p.stock_status === "sold_out") ? "sold_out" : first.stock_status,
    };
  });
}
