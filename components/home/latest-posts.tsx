import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { formatPostDate } from "@/lib/format";
import styles from "./latest-posts.module.css";

export async function LatestPosts() {
  const posts = (await getBlogPosts()).slice(0, 4);

  return (
    <section className={styles.section} aria-labelledby="latest-posts-title">
      <div className={styles.heading}>
        <h2 id="latest-posts-title">Aktualitātes</h2>
        <p>
          Jaunumi no darbnīcas, radoši stāsti un nelieli ieskati tajā, kas šobrīd top.
        </p>
      </div>

      <div className={styles.grid} aria-label="Jaunākās aktualitātes">
        {posts.map((post) => (
          <article className={`${styles.card} ${post.image_url ? "" : styles.cardNoImage}`} key={post.title}>
            <Link
              aria-label={`Lasīt aktualitāti: ${post.title}`}
              className={styles.cardLink}
              href={`/aktualitates/${post.slug}/`}
            >
              {post.image_url ? (
                <div className={`${styles.imageWrap} ${styles[post.tone]}`}>
                  <Image
                    alt={post.image_alt ?? post.title}
                    className={styles.image}
                    fill
                    sizes="(max-width: 720px) 78vw, (max-width: 980px) 50vw, 295px"
                    src={post.image_url}
                    style={post.image_position ? { objectPosition: post.image_position } : undefined}
                  />
                </div>
              ) : null}
              <div className={styles.cardBody}>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.archiveRow}>
        <p>Apskati visus jaunumus, notikumus un radošos stāstus vienuviet.</p>
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
