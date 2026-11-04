export type CheckoutItem = { id: string; quantity: number; color?: string };

const MAX_QUANTITY = 99;

export function normalizeCheckoutItems(value: unknown): CheckoutItem[] {
  if (!Array.isArray(value)) return [];
  const items = new Map<string, CheckoutItem>();
  for (const item of value) {
    if (!item || typeof item.id !== "string") continue;
    if (item.color !== undefined && (typeof item.color !== "string" || item.color.length > 80)) continue;
    const color = item.color?.trim() || undefined;
    const quantity = Math.min(Math.max(Math.floor(Number(item.quantity) || 0), 0), MAX_QUANTITY);
    if (quantity <= 0) continue;
    const key = JSON.stringify([item.id, color ?? ""]);
    const previous = items.get(key);
    items.set(key, { id: item.id, color, quantity: Math.min(MAX_QUANTITY, quantity + (previous?.quantity ?? 0)) });
  }
  return Array.from(items.values());
}

export type CheckoutProduct = {
  id: string;
  slug: string;
  name: string;
  price_cents: number | null;
  currency: string;
  stock_status: string;
  shop_product_colors?: Array<{ shop_colors: { name: string } | Array<{ name: string }> | null }>;
};

export function makeOrderItem(product: CheckoutProduct | undefined, item: CheckoutItem) {
  if (!product || product.stock_status === "sold_out" || product.price_cents === null) return null;
  const colors = (product.shop_product_colors ?? []).flatMap(({ shop_colors }) => Array.isArray(shop_colors) ? shop_colors.map(color => color.name) : shop_colors ? [shop_colors.name] : []);
  if (item.color && !colors.includes(item.color)) return null;
  return {
    product_id: product.id,
    product_slug: product.slug,
    product_name: `${product.name}${item.color ? ` — ${item.color}` : ""}`,
    selected_color: item.color ?? null,
    quantity: item.quantity,
    unit_price_cents: product.price_cents,
    currency: product.currency,
    line_total_cents: product.price_cents * item.quantity,
  };
}
