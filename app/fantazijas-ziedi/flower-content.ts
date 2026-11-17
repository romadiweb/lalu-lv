import type { Workshop } from "@/lib/content-types";

const imageRoot = "/images/fantazijas-ziedi-2026";
export const flowerGalleryPhotos = Array.from({ length: 49 }, (_, index) => ({
  id: `flower-gallery-${index + 1}`,
  image_url: `${imageRoot}/galerija-${index + 1}.webp`,
  image_alt: "LaLu lielformāta ziedi un ziedu kompozīcijas",
  image_position: null,
  title: null,
}));

type FlowerOffer = [
  slug: string, title: string, photo: string, height: string,
  fullTime: string, fullPrice: number, preparedTime: string, preparedPrice: number,
  purchasePrice?: number, includes?: string,
];

const offers: FlowerOffer[] = [
  ["magone", "Magone", "galerija-15", "ap 1,5 m", "5–6", 35, "2–3", 45],
  ["margrietinas", "Margrietiņas", "galerija-9", "ap 1,5 m", "4–5", 35, "3–4", 45],
  ["atraitnites", "Atraitnītes", "galerija-39", "ap 1 m", "6–7", 38, "3–4", 50],
  ["magnolijas", "Magnolijas", "galerija-38", "ap 1,5–2 m", "3–4", 35, "1,5–2", 45],
  ["vizbulites", "Vizbulītes", "galerija-32", "līdz 1 m", "6–7", 40, "3–4", 50, 55, "Cena par trim ziedkātiem."],
  ["lilija", "Lilija", "galerija-30", "ap 1,5 m", "6–7", 45, "3–4", 50, 55, "Cena par ziedkātu ar diviem ziediem un vienu pumpuru."],
  ["saulespuke", "Saulespuķe", "galerija-6", "ap 1,5 m", "6–7", 50, "3–4", 60],
  ["roze", "Roze", "galerija-14", "ap 1,5 m", "5–6", 40, "3–4", 50],
  ["rudzupuke", "Rudzupuķe", "galerija-24", "ap 1,5 m", "6–7", 45, "3–4", 55, 55, "Cena par vienu ziedkātu un vienu ziedu."],
  ["narcise", "Narcise", "galerija-26", "ap 1,5 m", "4–5", 35, "1,5–2,5", 60],
  ["sniegpulkstenites", "Sniegpulkstenītes", "galerija-2", "", "4–5", 35, "1,5–2", 45, 7, "Cena par trim ziedkātiem."],
  ["purenes", "Purenes", "galerija-5", "ap 1,2 m", "4–5", 35, "1–2", 45],
  ["erantes", "Erantes", "galerija-1", "", "4–5", 35, "1,5–2", 45, 7, "Cena par trim ziedkātiem."],
  ["dalijas", "Dālijas", "galerija-40", "ap 1,5 m", "6–7", 45, "3–4", 55, 65],
  ["krokuss", "Krokuss", "galerija-42", "ap 1 m", "6–7", 35, "2–3", 45],
];

export const flowerWorkshopOffers = Object.fromEntries(offers.map(([slug, , , , fullTime, fullPrice, preparedTime, preparedPrice, purchasePrice = 55]) => [
  `ziedi-${slug}`,
  [
    { label: "Pilna zieda izgatavošana", duration: `${fullTime} h`, price: `${fullPrice} €` },
    { label: "Ar iepriekš sagatavotām detaļām", duration: `${preparedTime} h`, price: `${preparedPrice} €` },
    { label: "Individuāla meistarklase", duration: "", price: "+15 €" },
    { label: "Gatava zieda iegāde", duration: "", price: `${purchasePrice} €` },
    { label: purchasePrice === 7 ? "Ziedu noma pēc vienošanās" : "Ziedkāta noma", duration: "24 h", price: "15 €" },
  ],
]));

export const flowerWorkshops: Workshop[] = offers.map(([slug, title, photo, height, fullTime, fullPrice, preparedTime, preparedPrice, , includes]) => ({
  id: `ziedi-${slug}`,
  slug: `ziedi-${slug}`,
  title,
  intro: height ? `Zieda augstums ${height}.` : "Meistarklasē izveidosi trīs ziedkātus.",
  details: [
    "Pilnajā nodarbībā ziedu izveidosi no sākuma līdz beigām. Īsākajā nodarbībā strādāsi ar daļēji sagatavotām detaļām.",
    "Abās cenās iekļauti materiāli, darbarīki un meistarklases vadīšana.",
    ...(includes ? [includes] : []),
  ],
  duration_label: `${fullTime} h vai ${preparedTime} h`,
  price_label: `${fullPrice} € vai ${preparedPrice} € no dalībnieka`,
  travel_label: "",
  image_url: `${imageRoot}/${photo}.webp`,
  image_alt: `LaLu lielformāta ziedi · ${title}`,
  cta_label: "Pieteikties meistarklasei",
  cta_href: "/pieteikties/",
}));
