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
  children?: StoreCategory[];
};

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

export const storeCategories: StoreCategory[] = [
  {
    name: "Rotaļlietas",
    href: "/veikals/category/rotallietas/",
    tone: "cream",
    description: "Mīksti, koši un bērniem draudzīgi darbi.",
    image: {
      src: "/images/category-icons/rotallietas-warm.png",
      alt: "Tamborēts lācis, zaķis un koka grabulis",
    },
    children: [
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
        name: "Lelles",
        href: "/veikals/category/lelles/",
        tone: "cream",
        description: "Mīkstas lelles rotaļām un dāvināšanai.",
        image: {
          src: "/images/category-icons/rotallietas-warm.png",
          alt: "Roku darinātas rotaļlietas",
        },
      },
      {
        name: "Grabulīši",
        href: "/veikals/category/grabulisi/",
        tone: "warm",
        description: "Mazajiem piemēroti grabulīši.",
        image: {
          src: "/images/category-icons/rotallietas-warm.png",
          alt: "Tamborēts lācis, zaķis un koka grabulis",
        },
      },
    ],
  },
  {
    name: "Apģērbs",
    href: "/veikals/category/apgerbs/",
    tone: "warm",
    description: "Adīti un tamborēti aksesuāri ikdienai.",
    image: {
      src: "/images/category-icons/cepures-warm.png",
      alt: "Adīti apģērba aksesuāri",
    },
    children: [
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
    ],
  },
  {
    name: "Dāvanas",
    href: "/veikals/category/davanas/",
    tone: "lavender",
    description: "Nelieli, sirsnīgi roku darba nieki dāvanām.",
    image: {
      src: "/images/category-icons/dazadi-warm.png",
      alt: "Rokdarbu sirds, zieds un smaržu maisiņš",
    },
    children: [
      {
        name: "Latviskie darbi",
        href: "/veikals/category/atstarotaji/",
        tone: "warm",
        description: "Gaismai, drošībai un latviskai noskaņai.",
        image: {
          src: "/images/category-icons/atstarotaji-warm.png",
          alt: "Latviskas lentītes emblēma",
        },
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
    ],
  },
  {
    name: "Ziedi",
    href: "/veikals/category/ziedi/",
    tone: "lavender",
    description: "Ziedi, kuri paliek ilgāk par sezonu.",
    image: {
      src: "/images/category-icons/fantazijas-ziedi-warm.png",
      alt: "Maigi rozā fantāzijas zieds",
    },
    children: [
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
    ],
  },
  {
    name: "Individuāli pasūtījumi",
    href: "/veikals/category/pasutijumi/",
    tone: "warm",
    description: "Individuāli darinājumi pēc vienošanās.",
    image: {
      src: "/images/category-icons/pasutijumi-warm.png",
      alt: "Tamborētu rokdarbu kompozīcija",
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
