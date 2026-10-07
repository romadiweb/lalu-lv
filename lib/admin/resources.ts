export type AdminField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "array" | "number" | "date" | "select" | "money";
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  help?: string;
  autoSlugFrom?: string;
  dbColumn?: boolean;
};

export type AdminResource = {
  section: string;
  label: string;
  description: string;
  table: string;
  orderBy: string;
  listColumns: string[];
  fields: AdminField[];
};

const statusOptions = [
  { label: "Publicēts", value: "published" },
  { label: "Melnraksts", value: "draft" },
  { label: "Arhīvs", value: "archived" },
];

export const adminResources: AdminResource[] = [
  {
    section: "raksti",
    label: "Raksti",
    description: "Aktualitāšu saraksts un rakstu lapas.",
    table: "blog_posts",
    orderBy: "published_at desc, sort_order asc",
    listColumns: ["title", "category", "status", "published_at"],
    fields: [
      { name: "title", label: "Virsraksts", type: "text", required: true },
      { name: "slug", label: "Saite / slug", type: "text", autoSlugFrom: "title", help: "Var atstāt tukšu - CMS izveidos no virsraksta." },
      { name: "category", label: "Kategorija", type: "text", required: true },
      { name: "excerpt", label: "Īsais apraksts", type: "textarea", required: true },
      { name: "body", label: "Raksta teksts", type: "array", help: "Viens paragrāfs katrā rindā." },
      { name: "author_name", label: "Autors", type: "text" },
      { name: "published_at", label: "Publicēšanas datums", type: "date", required: true },
      { name: "image_url", label: "Attēla URL", type: "text", required: true },
      { name: "image_alt", label: "Attēla alt teksts", type: "text", required: true },
      { name: "image_position", label: "Attēla pozīcija", type: "text", help: "Piemēram: 50% center" },
      {
        name: "tone",
        label: "Krāsu tonis",
        type: "select",
        options: [
          { label: "Lavanda", value: "lavender" },
          { label: "Silts", value: "warm" },
          { label: "Neitrāls", value: "neutral" },
        ],
      },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "meistarklases",
    label: "Meistarklases",
    description: "Divu kolonnu meistarklašu kartītes ar attēlu, tekstu un detaļām.",
    table: "workshops",
    orderBy: "sort_order asc, title asc",
    listColumns: ["title", "status", "duration_label", "price_label"],
    fields: [
      { name: "title", label: "Nosaukums", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", autoSlugFrom: "title", help: "Var atstāt tukšu - CMS izveidos no nosaukuma." },
      { name: "intro", label: "Ievads", type: "textarea", required: true },
      { name: "details", label: "Punkti", type: "array", help: "Viens punkts katrā rindā." },
      { name: "duration_label", label: "Ilgums", type: "text" },
      { name: "price_label", label: "Maksa", type: "text" },
      { name: "travel_label", label: "Izbraukums", type: "text" },
      { name: "image_url", label: "Attēla URL", type: "text", required: true },
      { name: "image_alt", label: "Attēla alt teksts", type: "text", required: true },
      { name: "cta_label", label: "CTA teksts", type: "text" },
      { name: "cta_href", label: "CTA saite", type: "text" },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "meistarklasu-kartites",
    label: "Meistarklašu info kartītes",
    description: "Trīs apakšējās info kartītes.",
    table: "workshop_feature_cards",
    orderBy: "sort_order asc, title asc",
    listColumns: ["title", "status", "sort_order"],
    fields: [
      { name: "title", label: "Nosaukums", type: "text", required: true },
      { name: "text", label: "Teksts", type: "textarea", required: true },
      { name: "image_url", label: "Attēla URL", type: "text", required: true },
      { name: "image_alt", label: "Attēla alt teksts", type: "text", required: true },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "fantazijas-ziedi",
    label: "Fantāzijas ziedu galerijas",
    description: "Galeriju sadaļas, kurās vēlāk dzīvos ziedu attēli.",
    table: "flower_galleries",
    orderBy: "sort_order asc, title asc",
    listColumns: ["title", "status", "slug"],
    fields: [
      { name: "title", label: "Nosaukums", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", autoSlugFrom: "title", help: "Var atstāt tukšu - CMS izveidos no nosaukuma." },
      { name: "description", label: "Apraksts", type: "textarea" },
      { name: "cover_image_url", label: "Vāka attēls", type: "text" },
      { name: "cover_image_alt", label: "Vāka alt teksts", type: "text" },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "ziedu-atteli",
    label: "Fantāzijas ziedu attēli",
    description: "Atsevišķi galerijas attēli. Gallery ID var nokopēt no galerijas saraksta.",
    table: "flower_gallery_items",
    orderBy: "sort_order asc, created_at desc",
    listColumns: ["title", "status", "gallery_id"],
    fields: [
      { name: "gallery_id", label: "Gallery ID", type: "text", required: true },
      { name: "title", label: "Nosaukums", type: "text" },
      { name: "description", label: "Apraksts", type: "textarea" },
      { name: "image_url", label: "Attēla URL", type: "text", required: true },
      { name: "image_alt", label: "Attēla alt teksts", type: "text", required: true },
      { name: "image_position", label: "Attēla pozīcija", type: "text" },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "veikala-kategorijas",
    label: "Veikala kategorijas",
    description: "Veikala kreisā navigācija un kategoriju nosaukumi.",
    table: "shop_categories",
    orderBy: "sort_order asc, name asc",
    listColumns: ["name", "is_active", "slug"],
    fields: [
      { name: "name", label: "Nosaukums", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", autoSlugFrom: "name", help: "Var atstāt tukšu - CMS izveidos no nosaukuma." },
      { name: "description", label: "Apraksts", type: "textarea" },
      { name: "image_url", label: "Attēla URL", type: "text" },
      { name: "image_alt", label: "Attēla alt teksts", type: "text" },
      {
        name: "tone",
        label: "Tonis",
        type: "select",
        options: [
          { label: "Lavanda", value: "lavender" },
          { label: "Krēms", value: "cream" },
          { label: "Silts", value: "warm" },
        ],
      },
      { name: "is_active", label: "Aktīva", type: "select", options: [{ label: "Jā", value: "true" }, { label: "Nē", value: "false" }] },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
  {
    section: "veikala-produkti",
    label: "Veikala produkti",
    description: "Produktu pamatdati, cenas, statusi un vairāki produkta attēli.",
    table: "shop_products",
    orderBy: "sort_order asc, name asc",
    listColumns: ["name", "status", "price_cents", "stock_status"],
    fields: [
      { name: "name", label: "Nosaukums", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", autoSlugFrom: "name", help: "Var atstāt tukšu - CMS izveidos no nosaukuma." },
      { name: "short_description", label: "Īsais apraksts", type: "textarea" },
      { name: "price_cents", label: "Cena EUR", type: "money", help: "Piemēram: 30.00 vai 30,00. Datubāzē saglabājas centos." },
      { name: "currency", label: "Valūta", type: "text" },
      {
        name: "stock_status",
        label: "Noliktavas statuss",
        type: "select",
        options: [
          { label: "Pieejams", value: "in_stock" },
          { label: "Pēc pasūtījuma", value: "made_to_order" },
          { label: "Izpārdots", value: "sold_out" },
        ],
      },
      { name: "status", label: "Statuss", type: "select", options: statusOptions },
      { name: "sort_order", label: "Secība", type: "number" },
    ],
  },
];

export function getAdminResource(section: string) {
  return adminResources.find((resource) => resource.section === section);
}
