export type PostPreview = {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  dateTime: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  slug: string;
  tone: "lavender" | "warm" | "neutral";
};

// Visual placeholder content. This array can be replaced by CMS records later.
export const posts: PostPreview[] = [
  {
    title: "Rudens LaLu darbnīcā: krāsas, idejas un jauni darbi",
    category: "Darbnīcas jaunumi",
    excerpt: "Jaunākās krāsas, idejas un darbi no LaLu radošās darbnīcas.",
    date: "2. oktobris, 2026",
    dateTime: "2026-10-02",
    image: "/images/rustic-knitted-cats.png",
    imageAlt: "LaLu darināti kaķi pie koka sienas",
    imagePosition: "22% center",
    slug: "rudens-lalu-darbnica",
    tone: "warm",
  },
  {
    title: "Fantāzijas ziedi, kas turpina ziedēt arī pēc vasaras",
    category: "Iedvesmai",
    excerpt: "Iedvesma sezonai un stāsts par ziediem, kas priecē arī pēc vasaras.",
    date: "24. septembris, 2026",
    dateTime: "2026-09-24",
    image: "/images/rustic-knitted-cats.png",
    imageAlt: "Roku darba detaļas LaLu darbnīcā",
    imagePosition: "51% center",
    slug: "fantazijas-ziedi-pec-vasaras",
    tone: "lavender",
  },
  {
    title: "Kā top LaLu tēli — no pirmās idejas līdz pēdējam valdziņam",
    category: "Aizkadrā",
    excerpt: "Ieskats LaLu tēlu tapšanā — no pirmās ieceres līdz rūpīgi pabeigtai detaļai.",
    date: "12. septembris, 2026",
    dateTime: "2026-09-12",
    image: "https://i.ytimg.com/vi/Gs507EVZiOc/hqdefault.jpg",
    imageAlt: "Ieskats LaLu rokdarbu izstādē",
    slug: "ka-top-lalu-teli",
    tone: "neutral",
  },
  {
    title: "Ciemošanās darbnīcā: ko piedzīvot lieliem un maziem",
    category: "Notikumi",
    excerpt: "Ko darbnīcas apmeklējumā var piedzīvot ģimenes, skolēni un pieaugušo grupas.",
    date: "30. augusts, 2026",
    dateTime: "2026-08-30",
    image: "https://lastatic.ams3.cdn.digitaloceanspaces.com/2013/10/g1/Tirdzins_KM_72.jpg",
    imageAlt: "LaLu darinājumi un priekšnesums Vērmaņdārzā",
    imagePosition: "58% center",
    slug: "ciemosanas-darbnica",
    tone: "warm",
  },
];
