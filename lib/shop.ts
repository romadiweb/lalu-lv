import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { groupShopProducts, type ProductOption } from "./product-options";
export { formatPrice } from "@/lib/format";

export type ShopCategory = {
  id: string;
  parent_id: string | null;
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
  description: string | null;
  price_cents: number | null;
  currency: string;
  stock_status: "in_stock" | "made_to_order" | "sold_out";
  is_washable: boolean;
  is_top_product: boolean;
  is_limited_stock: boolean;
  old_url: string | null;
  images: Array<{
    url: string;
    alt: string | null;
  }>;
  image: {
    url: string;
    alt: string | null;
  } | null;
  categorySlugs: string[];
  colors: string[];
  options?: ProductOption[];
  aliases?: string[];
};

type ProductRow = Omit<ShopProduct, "image" | "images" | "categorySlugs" | "colors"> & {
  shop_product_colors: Array<{ shop_colors: { name: string } | Array<{ name: string }> | null }>;
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

function getProductColors(product: ProductRow) {
  return (product.shop_product_colors ?? []).flatMap(({ shop_colors }) =>
    Array.isArray(shop_colors) ? shop_colors.map((color) => color.name) : shop_colors ? [shop_colors.name] : [],
  ).sort((a, b) => a.localeCompare(b, "lv"));
}

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
      .select("id, parent_id, slug, name, description, image_url, image_alt, tone")
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
          description,
          price_cents,
          currency,
          stock_status,
          is_washable,
          is_top_product,
          is_limited_stock,
          old_url,
          shop_product_images(url, alt, is_primary, sort_order),
          shop_product_categories(shop_categories(slug)),
          shop_product_colors(shop_colors(name))
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

    const productImages = images.map((image) => ({
      url: image.url,
      alt: image.alt,
    }));

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      short_description: product.short_description,
      description: product.description,
      price_cents: product.price_cents,
      currency: product.currency,
      stock_status: product.stock_status,
      is_washable: product.is_washable,
      is_top_product: product.is_top_product,
      is_limited_stock: product.is_limited_stock,
      colors: getProductColors(product),
      old_url: product.old_url,
      images: productImages,
      image: productImages[0] ?? null,
      categorySlugs: (product.shop_product_categories ?? [])
        .map((entry) => getCategorySlug(entry.shop_categories))
        .filter((slug): slug is string => Boolean(slug)),
    };
  });

  return {
    categories: (categoriesResponse.data ?? []) as ShopCategory[],
    products: groupShopProducts(products),
  };
}

export async function getShopProductBySlug(slug: string) {
  const { products } = await getShopData();
  const product = products.find(item => item.slug === slug || item.aliases?.includes(slug));
  if (!product) return null;
  return { ...product, initialOptionId: product.options?.find(option => option.slug === slug)?.id };
}
