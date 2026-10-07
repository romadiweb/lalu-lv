import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getFlowerGalleryBySlug } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fantāzijas ziedi | LaLu",
  description:
    "Lielformāta Fantāzijas ziedi svētkiem, fotosesijām, noformējumam, meistarklasēm un individuālām iecerēm.",
};

const offeringItems = [
  {
    title: "Noma",
    text: "Lielformāta ziedi un kompozīcijas svētkiem, fotosesijām, noformējumam un īpašiem notikumiem.",
  },
  {
    title: "Tirdzniecība",
    text: "Lielformāta ziedi un kompozīcijas iegādei un pastāvīgam noformējumam.",
  },
  {
    title: "Meistarklases",
    text: "Iemācies pats radīt lielformāta ziedus LaLu meistarklasēs.",
  },
  {
    title: "Individuāli pasūtījumi",
    text: "Ziedu un kompozīciju izgatavošana pēc Tavas ieceres un vajadzībām.",
  },
];

export default async function FantasyFlowersPage() {
  const data = await getFlowerGalleryBySlug("fantazijas-ziedi");
  const items = data?.items ?? [];

  const visibleItems = items.slice(0, 7);

  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section
        className={styles.introSection}
        aria-labelledby="fantasy-flowers-title"
      >
        <div className={styles.introHeader}>
          <p className={styles.introEyebrow}>LaLu darbnīca</p>

          <h1 id="fantasy-flowers-title">
            Fantāzijas ziedi
          </h1>

          <p className={styles.introLead}>
            Lielformāta ziedi un kompozīcijas svētkiem,
            fotosesijām, noformējumam un īpašām iecerēm.
          </p>
        </div>

        <div className={styles.offerArea}>
          <div className={styles.offerHeading}>
            <span>Piedāvājumā</span>
            <span>01 — 04</span>
          </div>

          <div className={styles.offerGrid}>
            {offeringItems.map((item, index) => (
              <article
                className={styles.offerItem}
                key={item.title}
              >
                <div className={styles.offerTop}>
                  <span className={styles.offerNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={styles.offerAccent}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.offerCopy}>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.showcase}
        aria-label="Fantāzijas ziedu galerija"
      >
        <div className={styles.showcaseInner}>
          <div
            className={`${styles.tile} ${styles.introTile}`}
          >
            <div className={styles.tileTop}>
              <span>Fantāzijas ziedi</span>
              <span>LaLu</span>
            </div>

            <div className={styles.tileContent}>
              <h2>
                Radīti
                <br />
                ar rokām
              </h2>

              <Link
                className={styles.tileButton}
                href="/social/facebook/"
                aria-label="Atvērt Fantāzijas ziedi Facebook"
              >
                <span>Facebook</span>

                <svg
                  viewBox="0 0 18 18"
                  aria-hidden="true"
                >
                  <path d="M5 13 13 5" />
                  <path d="M7 5h6v6" />
                </svg>
              </Link>
            </div>
          </div>

          {visibleItems.map((item, index) => (
            <figure
              className={`${styles.tile} ${
                styles.imageTile
              } ${styles[`imageTile${index + 1}`]}`}
              key={item.id}
            >
              <Image
                src={item.image_url}
                alt={item.image_alt}
                width={1000}
                height={800}
                sizes="
                  (max-width: 700px) 94vw,
                  (max-width: 1100px) 48vw,
                  34vw
                "
                style={
                  item.image_position
                    ? {
                        objectPosition:
                          item.image_position,
                      }
                    : undefined
                }
              />

              {item.title ? (
                <figcaption
                  className={styles.imageLabel}
                >
                  <span>{item.title}</span>
                </figcaption>
              ) : null}
            </figure>
          ))}

          <Link
            className={`${styles.tile} ${styles.shopTile}`}
            href="/veikals/category/fantazijas-ziedi/"
          >
            <div className={styles.shopTileTop}>
              <span>Veikals</span>
              <span>LaLu</span>
            </div>

            <div className={styles.shopTileBottom}>
              <strong>
                Apskatīt
                <br />
                Fantāzijas ziedus
              </strong>

              <span className={styles.shopArrow}>
                <svg
                  viewBox="0 0 18 18"
                  aria-hidden="true"
                >
                  <path d="M5 13 13 5" />
                  <path d="M7 5h6v6" />
                </svg>
              </span>
            </div>
          </Link>

          {items.length === 0 ? (
            <div
              className={`${styles.tile} ${styles.emptyTile}`}
            >
              <span>Fantāzijas ziedi</span>
            </div>
          ) : null}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}