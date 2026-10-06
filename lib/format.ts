export function formatPrice(cents: number | null, currency = "EUR") {
  if (cents === null) {
    return "Cena pēc vienošanās";
  }

  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
