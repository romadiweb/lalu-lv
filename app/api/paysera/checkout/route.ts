import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPayseraClient, getPayseraTestFlag, getPublicBaseUrl } from "@/lib/paysera";

export const runtime = "nodejs";

type CheckoutItem = {
  id: string;
  quantity: number;
};

type CheckoutRequest = {
  items?: CheckoutItem[];
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price_cents: number | null;
  currency: string;
  stock_status: string;
};

const MAX_QUANTITY = 99;

function normalizeItems(items: CheckoutRequest["items"]) {
  if (!Array.isArray(items)) {
    return [];
  }

  const quantities = new Map<string, number>();

  for (const item of items) {
    if (!item || typeof item.id !== "string") {
      continue;
    }

    const quantity = Math.min(Math.max(Math.floor(Number(item.quantity) || 0), 0), MAX_QUANTITY);

    if (quantity > 0) {
      quantities.set(item.id, (quantities.get(item.id) ?? 0) + quantity);
    }
  }

  return Array.from(quantities, ([id, quantity]) => ({
    id,
    quantity: Math.min(quantity, MAX_QUANTITY),
  }));
}

export async function POST(request: Request) {
  let body: CheckoutRequest;

  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Nederīgs pieprasījums." }, { status: 400 });
  }

  const items = normalizeItems(body.items);

  if (!items.length) {
    return NextResponse.json({ error: "Grozs ir tukšs." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const productIds = items.map((item) => item.id);
  const { data, error } = await supabase
    .from("shop_products")
    .select("id, slug, name, price_cents, currency, stock_status")
    .in("id", productIds)
    .eq("status", "published");

  if (error) {
    return NextResponse.json({ error: "Neizdevās pārbaudīt grozu." }, { status: 500 });
  }

  const products = new Map((data as ProductRow[]).map((product) => [product.id, product]));
  const orderItems = items.map((item) => {
    const product = products.get(item.id);

    if (!product || product.stock_status === "sold_out" || product.price_cents === null) {
      return null;
    }

    return {
      product_id: product.id,
      product_slug: product.slug,
      product_name: product.name,
      quantity: item.quantity,
      unit_price_cents: product.price_cents,
      currency: product.currency,
      line_total_cents: product.price_cents * item.quantity,
    };
  });

  if (orderItems.some((item) => item === null)) {
    return NextResponse.json(
      { error: "Dažas preces vairs nav pieejamas apmaksai." },
      { status: 409 },
    );
  }

  const validOrderItems = orderItems.filter((item): item is NonNullable<typeof item> => item !== null);
  const currency = validOrderItems[0]?.currency ?? "EUR";

  if (validOrderItems.some((item) => item.currency !== currency)) {
    return NextResponse.json({ error: "Vienā pasūtījumā var apmaksāt vienu valūtu." }, { status: 409 });
  }

  const amountCents = validOrderItems.reduce((total, item) => total + item.line_total_cents, 0);

  if (amountCents <= 0) {
    return NextResponse.json({ error: "Pasūtījuma summa nav derīga." }, { status: 400 });
  }

  const { data: order, error: orderError } = await supabase
    .from("shop_orders")
    .insert({
      amount_cents: amountCents,
      currency,
      status: "pending",
      provider: "paysera",
      items: validOrderItems,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Neizdevās izveidot pasūtījumu." }, { status: 500 });
  }

  const baseUrl = getPublicBaseUrl();
  const orderId = order.id as string;
  const paymentUrl = getPayseraClient().buildPaymentUrl({
    orderid: orderId,
    amount: amountCents,
    currency,
    accepturl: `${baseUrl}/apmaksa/veiksmiga?order=${orderId}`,
    cancelurl: `${baseUrl}/apmaksa/atcelta?order=${orderId}`,
    callbackurl: `${baseUrl}/api/paysera/callback`,
    country: "LV",
    lang: "LAV",
    test: getPayseraTestFlag(),
  });

  return NextResponse.json({ paymentUrl });
}
