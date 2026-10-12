import { PaymentStatus, type CallbackQuery } from "paysera-webtopay";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPayseraClient } from "@/lib/paysera";

export const runtime = "nodejs";

function getCallbackQuery(searchParams: URLSearchParams): CallbackQuery | null {
  const data = searchParams.get("data");

  if (!data) {
    return null;
  }

  return {
    data,
    ss1: searchParams.get("ss1") ?? undefined,
    ss2: searchParams.get("ss2") ?? undefined,
    ss3: searchParams.get("ss3") ?? undefined,
  };
}

export async function GET(request: Request) {
  const query = getCallbackQuery(new URL(request.url).searchParams);

  if (!query) {
    return new Response("Invalid callback", { status: 400 });
  }

  try {
    const callback = await getPayseraClient().validateCallback(query);
    const supabase = createAdminClient();
    const { data: order, error } = await supabase
      .from("shop_orders")
      .select("id, amount_cents, currency")
      .eq("id", callback.orderid)
      .single();

    if (error || !order) {
      return new Response("Invalid callback", { status: 400 });
    }

    const expectedAmount = String(order.amount_cents);
    const expectedCurrency = String(order.currency);

    if (callback.amount !== expectedAmount || callback.currency !== expectedCurrency) {
      await supabase
        .from("shop_orders")
        .update({
          status: "payment_mismatch",
          provider_payload: callback,
          paid_at: null,
        })
        .eq("id", order.id);

      return new Response("Invalid callback", { status: 400 });
    }

    const isPaid =
      callback.status === PaymentStatus.SUCCESSFUL ||
      callback.status === PaymentStatus.ACCEPTED ||
      callback.status === PaymentStatus.EXECUTED_NO_CONFIRMATION;

    await supabase
      .from("shop_orders")
      .update({
        status: isPaid ? "paid" : "pending",
        provider_request_id: callback.requestid,
        provider_payload: callback,
        paid_at: isPaid ? new Date().toISOString() : null,
      })
      .eq("id", order.id);

    return new Response("OK");
  } catch (error) {
    console.error("Paysera callback validation failed", error);
    return new Response("Invalid callback", { status: 400 });
  }
}
