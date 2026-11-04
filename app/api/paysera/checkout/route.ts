import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPayseraClient, getPayseraTestFlag, getPublicBaseUrl } from "@/lib/paysera";
import { normalizeCheckoutItems, makeOrderItem, type CheckoutItem, type CheckoutProduct } from "@/lib/checkout-items";

export const runtime = "nodejs";

type CheckoutRequest = {
  items?: CheckoutItem[];
};

export async function POST(request: Request) {
  let body: CheckoutRequest;

  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Nederīgs pieprasījums." }, { status: 400 });
  }

  const items = normalizeCheckoutItems(body.items);

  if (!items.length) {
    return NextResponse.json({ error: "Grozs ir tukšs." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const productIds = items.map((item) => item.id);
  const { data, error } = await supabase
    .from("shop_products")
    .select("id, slug, name, price_cents, currency, stock_status, shop_product_colors(shop_colors(name))")
    .in("id", productIds)
    .eq("status", "published");

  if (error) {
    return NextResponse.json({ error: "Neizdevās pārbaudīt grozu." }, { status: 500 });
  }

  const products = new Map((data as unknown as CheckoutProduct[]).map((product) => [product.id, product]));
  const orderItems = items.map((item) => makeOrderItem(products.get(item.id), item));

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
