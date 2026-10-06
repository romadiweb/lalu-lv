import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
export { formatPrice } from "@/lib/format";

export type ShopCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  tone: "lavender" | "cream" | "warm";
};

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  price_cents: number | null;
  currency: string;
  stock_status: "in_stock" | "made_to_order" | "sold_out";
  old_url: string | null;
  image: {
    url: string;
    alt: string | null;
  } | null;
  categorySlugs: string[];
};

type ProductRow = Omit<ShopProduct, "image" | "categorySlugs"> & {
  shop_product_images: Array<{
    url: string;
    alt: string | null;
    is_primary: boolean;
    sort_order: number;
  }>;
  shop_product_categories: Array<{
    shop_categories:
      | {
          slug: string;
        }
      | Array<{
          slug: string;
        }>
      | null;
  }>;
};

function getCategorySlug(
  relation: ProductRow["shop_product_categories"][number]["shop_categories"],
) {
  if (Array.isArray(relation)) {
    return relation[0]?.slug;
  }

  return relation?.slug;
}

export async function getShopData() {
  noStore();

  const supabase = await createClient();
  const [categoriesResponse, productsResponse] = await Promise.all([
    supabase
      .from("shop_categories")
      .select("id, slug, name, description, image_url, image_alt, tone")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    supabase
      .from("shop_products")
      .select(
        `
          id,
          slug,
          name,
          short_description,
          price_cents,
          currency,
          stock_status,
          old_url,
          shop_product_images(url, alt, is_primary, sort_order),
          shop_product_categories(shop_categories(slug))
        `,
      )
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  if (categoriesResponse.error) {
    throw new Error(categoriesResponse.error.message);
  }

  if (productsResponse.error) {
    throw new Error(productsResponse.error.message);
  }

  const products = ((productsResponse.data ?? []) as unknown as ProductRow[]).map((product) => {
    const images = [...(product.shop_product_images ?? [])].sort((a, b) => {
      if (a.is_primary !== b.is_primary) {
        return a.is_primary ? -1 : 1;
      }

      return a.sort_order - b.sort_order;
    });

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      short_description: product.short_description,
      price_cents: product.price_cents,
      currency: product.currency,
      stock_status: product.stock_status,
      old_url: product.old_url,
      image: images[0] ? { url: images[0].url, alt: images[0].alt } : null,
      categorySlugs: (product.shop_product_categories ?? [])
        .map((entry) => getCategorySlug(entry.shop_categories))
        .filter((slug): slug is string => Boolean(slug)),
    };
  });

  return {
    categories: (categoriesResponse.data ?? []) as ShopCategory[],
    products,
  };
}

export async function getShopProductBySlug(slug: string) {
  noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shop_products")
    .select(
      `
        id,
        slug,
        name,
        short_description,
        price_cents,
        currency,
        stock_status,
        old_url,
        shop_product_images(url, alt, is_primary, sort_order),
        shop_product_categories(shop_categories(slug))
      `,
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const product = data as unknown as ProductRow;
  const images = [...(product.shop_product_images ?? [])].sort((a, b) => {
    if (a.is_primary !== b.is_primary) {
      return a.is_primary ? -1 : 1;
    }

    return a.sort_order - b.sort_order;
  });

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    short_description: product.short_description,
    price_cents: product.price_cents,
    currency: product.currency,
    stock_status: product.stock_status,
    old_url: product.old_url,
    image: images[0] ? { url: images[0].url, alt: images[0].alt } : null,
    categorySlugs: (product.shop_product_categories ?? [])
      .map((entry) => getCategorySlug(entry.shop_categories))
      .filter((categorySlug): categorySlug is string => Boolean(categorySlug)),
  };
}
