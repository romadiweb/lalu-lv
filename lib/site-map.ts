export type NavItem = {
  label: string;
  href: string;
};

export type StoreCategory = {
  name: string;
  href: string;
  tone: "lavender" | "cream" | "warm";
  description: string;
  image: {
    src: string;
    alt: string;
  };
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
    image: {
      src: "/images/category-icons/peles-warm.png",
      alt: "Pelēka tamborēta pele",
    },
  },
  {
    name: "Rotaļlietas",
    href: "/veikals/category/rotallietas/",
    tone: "cream",
    description: "Mīksti, koši un bērniem draudzīgi darbi.",
    image: {
      src: "/images/category-icons/rotallietas-warm.png",
      alt: "Tamborēts lācis, zaķis un koka grabulis",
    },
    nested: true,
  },
  {
    name: "Cepures",
    href: "/veikals/category/cepures/",
    tone: "warm",
    description: "Siltas sezonas izvēles katrai dienai.",
    image: {
      src: "/images/category-icons/cepures-warm.png",
      alt: "Krēmīga adīta cepure ar bumbuli",
    },
  },
  {
    name: "Cimdi",
    href: "/veikals/category/cimdi/",
    tone: "lavender",
    description: "Adīti pāri ar amatnieces rokrakstu.",
    image: {
      src: "/images/category-icons/cimdi-warm.png",
      alt: "Gaiši adīti cimdi",
    },
    nested: true,
  },
  {
    name: "Mauči jeb dūrgaļi",
    href: "/veikals/category/mauci-jeb-durgali/",
    tone: "cream",
    description: "Praktiski un dekoratīvi plaukstu sildītāji.",
    image: {
      src: "/images/category-icons/mauci-jeb-durgali-warm.png",
      alt: "Rakstaini vilnas mauči",
    },
  },
  {
    name: "Latviski darbi / Atstarotāji",
    href: "/veikals/category/atstarotaji/",
    tone: "warm",
    description: "Gaismai, drošībai un latviskai noskaņai.",
    image: {
      src: "/images/category-icons/atstarotaji-warm.png",
      alt: "Latviskas lentītes emblēma",
    },
  },
  {
    name: "Dažādi",
    href: "/veikals/category/atslegu-piekarini/",
    tone: "lavender",
    description: "Nelieli atradumi un dāvanu nieki.",
    image: {
      src: "/images/category-icons/dazadi-warm.png",
      alt: "Rokdarbu sirds, zieds un smaržu maisiņš",
    },
    nested: true,
  },
  {
    name: "Magnētiņi",
    href: "/veikals/category/magnetini/",
    tone: "cream",
    description: "Mazie piemiņas darbi ikdienai.",
    image: {
      src: "/images/category-icons/magnetini-warm.png",
      alt: "Koka sirds magnētiņi",
    },
  },
  {
    name: "Pasūtījumi",
    href: "/veikals/category/pasutijumi/",
    tone: "warm",
    description: "Individuāli darinājumi pēc vienošanās.",
    image: {
      src: "/images/category-icons/pasutijumi-warm.png",
      alt: "Tamborētu rokdarbu kompozīcija",
    },
  },
  {
    name: "Fantāzijas ziedi",
    href: "/veikals/category/fantazijas-ziedi/",
    tone: "lavender",
    description: "Ziedi, kuri paliek ilgāk par sezonu.",
    image: {
      src: "/images/category-icons/fantazijas-ziedi-warm.png",
      alt: "Maigi rozā fantāzijas zieds",
    },
  },
];

export const navItems: NavItem[] = [
  { label: "Veikals", href: "/veikals/" },
  { label: "Meistarklases", href: "/meistarklases/" },
  { label: "Ekskursijas", href: "/ekskursijas/" },
  { label: "Fantāzijas ziedi", href: "/fantazijas-ziedi/" },
  { label: "Raksti", href: "/aktualitates/" },
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
      { label: "Pieteikties ciemos", href: "/pieteikties/" },
    ],
  },
];
