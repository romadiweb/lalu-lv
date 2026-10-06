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
  body: string[];
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
    body: [
      "Rudens darbnīcā ienāk ar mierīgākām krāsām, biezākiem pavedieniem un vēlmi radīt lietas, kas sasilda. Plauktos parādās jauni tēli, adījumi un mazi sezonas pārsteigumi, ko var apskatīt klātienē.",
      "Šajā laikā īpaši labi redzams roku darba ritms: katram darbam ir savs valdziņš, sava noskaņa un mazs stāsts. Daļa ideju kļūst par dāvanām, daļa paliek kā iedvesma nākamajām meistarklasēm.",
      "Ja vēlies redzēt, kas šobrīd top, vislabāk ir atbraukt ciemos vai sekot jaunumiem sociālajos tīklos. Darbnīcā vienmēr ir kaut kas, ko pamanīt tikai tuvumā.",
    ],
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
    body: [
      "Fantāzijas ziedi nav piesaistīti sezonai. Tie turpina ziedēt arī tad, kad dārzs ārā kļūst klusāks, un tieši tāpēc tie iederas gan mājās, gan dāvanās, gan svētku noformējumā.",
      "Katrs zieds top kā neliela kompozīcija: krāsa, forma un materiāls tiek salikti tā, lai darbs saglabātu vieglumu un prieku. Tie nav vienkārši dekori, bet mazi roku darba akcenti ar raksturu.",
      "Rudenī īpaši skaisti izskatās maigie lavandas, krēmkrāsas un siltie dabas toņi. Tie ļauj vasaras sajūtai palikt klātesošai vēl ilgi pēc tās beigām.",
    ],
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
    body: [
      "Katrs tēls sākas ar pavisam vienkāršu jautājumu: kādu sajūtu tam vajadzētu nest? Dažreiz pirmā ir krāsa, citreiz seja, forma vai mazs rakstura pavediens, kas nosaka visu pārējo.",
      "Tālāk seko darbs ar materiālu. Valdziņi, detaļas un proporcijas tiek pielāgotas, līdz tēls sāk izskatīties dzīvs. Šajā procesā nav steigas, jo tieši lēnās izvēles padara roku darbu atpazīstamu.",
      "Pēdējais solis ir raksturs. Acis, aksesuārs vai neliela tekstūra var pilnībā mainīt noskaņu, tāpēc katrs tēls tiek pabeigts tikai tad, kad tas šķiet gatavs satikt savu cilvēku.",
    ],
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
    body: [
      "Ciemošanās darbnīcā ir iespēja ieraudzīt rokdarbus tuvumā un sajust vietu, kur tie top. Apmeklējums var būt mierīga apskate, stāsts par senlietām vai aktīvāka programma ar pagalma piedzīvojumiem.",
      "Ģimenēm un skolēnu grupām patīk iespēja darboties, pētīt un jautāt. Pieaugušajiem bieži visvairāk paliek atmiņā Vectēva stāsts, darbnīcas noskaņa un sarunas par lietām, kas darinātas ar rokām.",
      "Programmu var pielāgot grupai, laikam un notikumam. Pirms braukšanas vislabāk sazināties, lai vienotos par datumu, cilvēku skaitu un to, vai ciemošanos papildināt ar degustāciju vai meistarklasi.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
