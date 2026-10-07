export function formatPrice(cents: number | null, currency = "EUR") {
  if (cents === null) {
    return "Cena pēc vienošanās";
  }

  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("lv-LV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
