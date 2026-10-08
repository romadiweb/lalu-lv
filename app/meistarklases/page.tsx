import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/footer/site-footer";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";
import { getWorkshopsPageData } from "@/lib/content";
import { WorkshopCarousel } from "./workshop-carousel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Meistarklases | LaLu",
  description:
    "LaLu radošās darbnīcas meistarklases ar sagatavotiem materiāliem, mierīgu vadību un iespējām grupām.",
};

export default async function MeistarklasesPage() {
  const { workshops, featureCards } = await getWorkshopsPageData();

  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.workshopIntro} aria-labelledby="masterclass-list-title">
        <section className={styles.masterclassSection} aria-labelledby="masterclass-list-title">
          <h1 id="masterclass-list-title">Radošās meistarklases</h1>

          <WorkshopCarousel workshops={workshops} />
        </section>

        <div className={styles.visitBand}>
          <div className={styles.visitCopy}>
            <h2>Meistarklase var atbraukt arī pie jums</h2>
            <p>
              Ja grupa jau ir kopā skolā, uzņēmumā vai svētku vietā, radošo
              nodarbību var sarunāt ārpus darbnīcas ar sagatavotu materiālu
              komplektu.
            </p>
            <a href="/pieteikties/">Pieteikties meistarklasei</a>
          </div>
          <div className={styles.visitVisual}>
            <Image
              className={styles.visitImage}
              src="/images/custom-icons/crafting-crate-community-badges.png"
              alt="Rokdarbu kaste ar kopienas, skolas, svētku un darba grupas simboliem"
              width={1536}
              height={1152}
              sizes="(max-width: 900px) 82vw, 540px"
            />
          </div>
        </div>

        <div className={styles.copy}>
          <h2>Viss nepieciešamais jau būs sagatavots.</h2>
          <p>
            Meistarklases top siltā darbnīcas ritmā: ar materiāliem uz galda,
            skaidru vadību un vietu katram dalībniekam darboties savā tempā.
          </p>
        </div>

        {featureCards.length ? (
          <div className={styles.cardGrid}>
            {featureCards.map((card) => (
              <article className={styles.card} key={card.id}>
                <div className={styles.imageWrap}>
                  <Image
                    className={styles.image}
                    src={card.image_url}
                    alt={card.image_alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 760px) 180px, 220px"
                  />
                </div>
                <div className={styles.cardCopy}>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
