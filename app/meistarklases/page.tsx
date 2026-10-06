import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/footer/site-footer";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

const workshopCards = [
  {
    title: "Materiāli iekļauti",
    text: "Dzija, pamata instrumenti un sagataves būs gaidīšanas kārtībā, lai nodarbību var sākt mierīgi.",
    image: "/images/custom-icons/cozy-crochet-craft-bundle.png",
    alt: "Dzija, tamboradata un tekstila lente meistarklases materiāliem",
  },
  {
    title: "Bez pieredzes",
    text: "Soli pa solim var pievienoties arī tad, ja rokdarbi līdz šim ir tikai interesējuši no malas.",
    image: "/images/custom-icons/buttery-yellow-crochet-star-plush.png",
    alt: "Dzeltens tamborēts zvaigznes formas mīkstais darbs",
  },
  {
    title: "Grupām piemērots",
    text: "Meistarklasi var pielāgot ģimenēm, skolēniem, kolēģiem vai nelielām svētku grupām.",
    image: "/images/custom-icons/crocheted-amigurumi-community-trio.png",
    alt: "Trīs tamborēti cilvēciņi grupas nodarbības noskaņai",
  },
];

const masterclasses = [
  {
    title: "Izveido savu unikālo atstarotāju",
    intro:
      "Sirsnīga un praktiska meistarklase, kurā katrs izveido savu pašdarinātu atstarotāju.",
    details: [
      "Skaists un praktisks aksesuārs drošībai tumsā",
      "Katrs dalībnieks mājās dodas ar gatavu darbu",
      "Piemērota pieaugušajiem, bērniem un grupām",
    ],
    duration: "Aptuveni 0,5 stundas",
    price: "Dalības maksa: 3 eiro",
    travel: "Piedāvāju izbraukuma meistarklases",
    image: "/images/atstarotaji.jpg",
    alt: "Latviskas lentes atstarotāji uz koka virsmas",
  },
  {
    title: "Izveido savu unikālo piespraudi vai brošu",
    intro:
      "Radoša nodarbība, kurā top paša darināta piespraude latviskā vai ziedu noskaņā.",
    details: [
      "Var izvēlēties krāsas, detaļas un noskaņu",
      "Katrs dalībnieks mājās dodas ar savu piespraudi",
      "Piemērota kolektīviem, nometnēm un svētku grupām",
    ],
    duration: "Aptuveni 1 stunda",
    price: "Dalības maksa: 10 eiro",
    travel: "Piedāvāju izbraukuma meistarklases",
    image: "/images/piespraude.jpg",
    alt: "Sarkanas un baltas latviskas brošas uz koka virsmas",
  },
];

export const metadata: Metadata = {
  title: "Meistarklases | LaLu",
  description:
    "LaLu radošās darbnīcas meistarklases ar sagatavotiem materiāliem, mierīgu vadību un iespējām grupām.",
};

export default function MeistarklasesPage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.workshopIntro} aria-labelledby="masterclass-list-title">
        <section className={styles.masterclassSection} aria-labelledby="masterclass-list-title">
          <h1 id="masterclass-list-title">Radošās meistarklases</h1>
          <div
            className={styles.masterclassGrid}
            role="region"
            aria-label="Meistarklašu kartītes"
            tabIndex={0}
          >
            {masterclasses.map((item) => (
              <article className={styles.masterclassCard} key={item.title}>
                <div className={styles.masterclassImageWrap}>
                  <Image
                    className={styles.masterclassImage}
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 700px) 78vw, (max-width: 1100px) 38vw, 330px"
                  />
                </div>
                <div className={styles.masterclassCopy}>
                  <h2>{item.title}</h2>
                  <p>{item.intro}</p>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <dl>
                    <div>
                      <dt>Ilgums</dt>
                      <dd>{item.duration}</dd>
                    </div>
                    <div>
                      <dt>Maksa</dt>
                      <dd>{item.price}</dd>
                    </div>
                    <div>
                      <dt>Izbraukums</dt>
                      <dd>{item.travel}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
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

        <div className={styles.cardGrid}>
          {workshopCards.map((card) => (
            <article className={styles.card} key={card.title}>
              <div className={styles.imageWrap}>
                <Image
                  className={styles.image}
                  src={card.image}
                  alt={card.alt}
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
      </section>

      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
