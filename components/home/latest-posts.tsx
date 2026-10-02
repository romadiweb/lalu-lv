import Image from "next/image";
import Link from "next/link";
import styles from "./latest-posts.module.css";

type PostPreview = {
  title: string;
  category: string;
  date: string;
  dateTime: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  slug: string;
  tone: "lavender" | "warm" | "neutral";
};

// Visual placeholder content. This array can be replaced by CMS records later.
const posts: PostPreview[] = [
  {
    title: "Rudens LaLu darbnīcā: krāsas, idejas un jauni darbi",
    category: "Darbnīcas jaunumi",
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
    date: "30. augusts, 2026",
    dateTime: "2026-08-30",
    image: "https://lastatic.ams3.cdn.digitaloceanspaces.com/2013/10/g1/Tirdzins_KM_72.jpg",
    imageAlt: "LaLu darinājumi un priekšnesums Vērmaņdārzā",
    imagePosition: "58% center",
    slug: "ciemosanas-darbnica",
    tone: "warm",
  },
];

export function LatestPosts() {
  return (
    <section className={styles.section} aria-labelledby="latest-posts-title">
      <div className={styles.heading}>
        <h2 id="latest-posts-title">Aktualitātes</h2>
        <p>
          Jaunumi no darbnīcas, radoši stāsti un nelieli ieskati tajā, kas šobrīd top LaLu.
        </p>
      </div>

      <div className={styles.grid} aria-label="Jaunākās LaLu aktualitātes">
        {posts.map((post) => (
          <article className={styles.card} key={post.title}>
            <Link
              aria-label={`Lasīt aktualitāti: ${post.title}`}
              className={styles.cardLink}
              href={`/aktualitates/${post.slug}/`}
            >
              <div className={`${styles.imageWrap} ${styles[post.tone]}`}>
                <Image
                  alt={post.imageAlt}
                  className={styles.image}
                  fill
                  sizes="(max-width: 720px) 78vw, (max-width: 980px) 50vw, 295px"
                  src={post.image}
                  style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                />
              </div>
              <div className={styles.cardBody}>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <time dateTime={post.dateTime}>{post.date}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.archiveRow}>
        <p>Apskati visus LaLu jaunumus, notikumus un radošos stāstus vienuviet.</p>
        <Link href="/aktualitates/">
          Skatīt visus
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M4 10h11M11 5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
