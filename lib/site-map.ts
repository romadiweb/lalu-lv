export type NavItem = {
  label: string;
  href: string;
};

export type StoreCategory = {
  name: string;
  href: string;
  tone: "lavender" | "cream" | "warm";
  description: string;
  nested?: boolean;
};

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

export const storeCategories: StoreCategory[] = [
  {
    name: "Peles",
    href: "/veikals/category/peles/",
    tone: "lavender",
    description: "Roku darinātas peles ar raksturu.",
  },
  {
    name: "Rotaļlietas",
    href: "/veikals/category/rotallietas/",
    tone: "cream",
    description: "Mīksti, koši un bērniem draudzīgi darbi.",
    nested: true,
  },
  {
    name: "Cepures",
    href: "/veikals/category/cepures/",
    tone: "warm",
    description: "Siltas sezonas izvēles katrai dienai.",
  },
  {
    name: "Cimdi",
    href: "/veikals/category/cimdi/",
    tone: "lavender",
    description: "Adīti pāri ar amatnieces rokrakstu.",
    nested: true,
  },
  {
    name: "Mauči jeb dūrgaļi",
    href: "/veikals/category/mauci-jeb-durgali/",
    tone: "cream",
    description: "Praktiski un dekoratīvi plaukstu sildītāji.",
  },
  {
    name: "Latviski darbi / Atstarotāji",
    href: "/veikals/category/atstarotaji/",
    tone: "warm",
    description: "Gaismai, drošībai un latviskai noskaņai.",
  },
  {
    name: "Dažādi",
    href: "/veikals/category/atslegu-piekarini/",
    tone: "lavender",
    description: "Nelieli atradumi un dāvanu nieki.",
    nested: true,
  },
  {
    name: "Magnētiņi",
    href: "/veikals/category/magnetini/",
    tone: "cream",
    description: "Mazie piemiņas darbi ikdienai.",
  },
  {
    name: "Pasūtījumi",
    href: "/veikals/category/pasutijumi/",
    tone: "warm",
    description: "Individuāli darinājumi pēc vienošanās.",
  },
  {
    name: "Fantāzijas ziedi",
    href: "/veikals/category/fantazijas-ziedi/",
    tone: "lavender",
    description: "Ziedi, kuri paliek ilgāk par sezonu.",
  },
];

export const navItems: NavItem[] = [
  { label: "Veikals", href: "/veikals/" },
  { label: "Meistarklases", href: "/meistarklases/" },
  { label: "Ekskursijas", href: "/ekskursijas/" },
  { label: "Fantāzijas ziedi", href: "/fantazijas-ziedi/" },
  { label: "Par mums", href: "/par-mums/" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "LaLu",
    links: [
      { label: "Par LaLu", href: "/par-mums/" },
      { label: "Vectēva stāsts", href: "/vecteva-stasts/" },
      { label: "Pagalma piedzīvojumi", href: "/ekskursijas/" },
    ],
  },
  {
    title: "Veikals",
    links: storeCategories.slice(0, 5).map(({ name, href }) => ({ label: name, href })),
  },
  {
    title: "Notikumi",
    links: [
      { label: "Meistarklases", href: "/meistarklases/" },
      { label: "Ekskursijas", href: "/ekskursijas/" },
      { label: "Pieteikties ciemos", href: "/kontakti/" },
    ],
  },
];
