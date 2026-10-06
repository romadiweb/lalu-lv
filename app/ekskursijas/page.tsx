import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/footer/site-footer";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

const phone = "+371 26878579";
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

export const metadata: Metadata = {
  title: "Ekskursijas | LaLu",
  description:
    "LaLu radošās darbnīcas ekskursijas, Vectēva stāsts, pagalma piedzīvojumi, Lauku ķēķa degustācijas un meistarklases Aizputē.",
};

function ArrowIcon() {
  return (
    <span className={styles.rollingArrow} aria-hidden="true">
      <svg viewBox="0 0 20 20">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
      <svg viewBox="0 0 20 20">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </span>
  );
}

const excursionCards = [
  {
    title: "Darbnīcas apmeklējums",
    kicker: "Bezmaksas",
    price: "Iepirkšanās un apskate",
    description:
      "Ienāc LaLu darbnīcā, apskati rokdarbus un izvēlies sirsnīgu dāvanu turpat Aizputē.",
    details: ["Rokdarbu apskate", "Iespēja iepirkties", "Pēc iepriekšējas vienošanās"],
    icon: "/images/custom-icons/Cozy Crochet Teddy Craft Table.png",
  },
  {
    title: "Vectēva stāsts",
    kicker: "Ekskursija",
    price: "Pieaugušajiem 4 EUR, bērniem 3 EUR",
    description:
      "LaLu stāsts ar darbnīcas sajūtu, senām atmiņām un mierīgu ciemošanos nelielām grupām.",
    details: ["Stāstījums darbnīcā", "Piemērots ģimenēm un skolām", "Var apvienot ar pagalmu"],
    icon: "/images/custom-icons/Nostalgic Heirloom Chest with Keepsakes.png",
    featured: true,
  },
  {
    title: "Pagalma piedzīvojumi",
    kicker: "Pasaku taka",
    price: "Aktivitātes pēc vienošanās",
    description:
      "Pagalma apskate ar darbošanos, pasaku noskaņu un mazu līdzi ņemamu prieku.",
    details: ["Pelnrušķītes kurpīte", "Aktivitātes ārā", "Radošs pārsteigums līdzi"],
    icon: "/images/custom-icons/Miniature Woodland Discovery Diorama.png",
  },
  {
    title: "Meistarklases",
    kicker: "Radošā darbnīca",
    price: "Programma pēc sarunas",
    description:
      "Roku darbs, kopā būšana un īpašs process dzimšanas dienām, nometnēm vai radu salidojumiem.",
    details: ["Svētki un pasākumi", "Nometnes un grupas", "Saturs pielāgots vecumam"],
    icon: "/images/custom-icons/Cozy Crochet Craft Still Life.png",
  },
];

const kitchenCards = [
  {
    title: "Bada pankūkas",
    price: "12 EUR no personas",
    note: "1,5-2 stundas",
    text: "Pagalma un darbnīcas apskate ar stāstu, dzīvas uguns cepšanas process, LaLu pagalma ievārījums un tējas rituāls.",
  },
  {
    title: "Ķiļķeni",
    price: "12 EUR no personas",
    note: "Iekļauts darbnīcas apmeklējums",
    text: "Vecmāmiņas recepte uz dzīvas uguns ar sīpolu-gaļas vai krējuma mērci un Vectēva stāstu.",
  },
  {
    title: "Ugunskura zupa",
    price: "12 EUR",
    note: "1,5-2 stundas",
    text: "Pagalma un darbnīcas apskate, līdzi darbošanās un zupa pēc izvēles.",
  },
  {
    title: "Īpašās tējas rituāls",
    price: "7 EUR no personas",
    note: "Degustācija un meistarklase",
    text: "LaLu pagalma tējas rituāls kopā ar darbnīcas apmeklējumu un Vectēva stāstu.",
  },
];

const bookingNotes = [
  "Ekskursijas, pasākumi, svētki, nometnes, dzimšanas dienas un radu salidojumi tiek sarunāti individuāli.",
  "Ugunskura un piknika vieta līdz 10 cilvēkiem: 15 EUR; par katru nākamo cilvēku 1 EUR klāt.",
  "Ugunskurs, galds, trauki un citas detaļas tiek saskaņotas pēc vienošanās.",
];

export default function EkskursijasPage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.hero} aria-labelledby="excursion-title">
        <div className={styles.heroCopy}>
          <h1 id="excursion-title">Ekskursijas LaLu darbnīcā</h1>
          <p>
            Aicinām braukt ciemos uz radošo darbnīcu LaLu Aizputē: apskatīt
            rokdarbus, klausīties Vectēva stāstu, doties pagalma piedzīvojumos
            vai pievienot siltu Lauku ķēķa meistarklasi.
          </p>
          <div className={styles.heroActions}>
            <a href="/pieteikties/">
              Pieteikt ekskursiju
              <ArrowIcon />
            </a>
            <a href={phoneHref}>Zvanīt LaLu</a>
          </div>
        </div>

        <aside className={styles.visitBoard} aria-label="Ciemošanās izvēles priekšskatījums">
          <Image
            className={styles.visitBoardImage}
            src="/images/custom-icons/latvian-adventure-selection-ui.png"
            alt="Ilustrēta ciemošanās izvēles grafika ar vairākiem darbnīcas piedzīvojumu variantiem."
            width={1170}
            height={1408}
            priority
            sizes="(max-width: 980px) min(100vw - 48px, 620px), 520px"
          />
        </aside>
      </section>

      <section className={styles.offerSection} aria-labelledby="offers-title">
        <div className={styles.sectionIntro}>
          <h2 id="offers-title">Izvēlies savu ciemošanās veidu</h2>
          <p>
            Piedāvājumus var kombinēt pēc grupas vecuma, ilguma un notikuma
            sajūtas. Visdrošāk ir uzrakstīt vai piezvanīt, lai vienotos par
            konkrētu datumu un programmu.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {excursionCards.map((card) => (
            <article
              className={`${styles.offerCard}${card.featured ? ` ${styles.featuredCard}` : ""}`}
              key={card.title}
            >
              <div className={styles.cardBand}>
                <span className={styles.iconTile} aria-hidden="true">
                  <Image
                    className={styles.cardIcon}
                    src={card.icon}
                    alt=""
                    width={1254}
                    height={1254}
                    sizes="104px"
                  />
                </span>
                <span>{card.kicker}</span>
                <h3>{card.title}</h3>
              </div>
              <div className={styles.cardBody}>
                <strong>{card.price}</strong>
                <p>{card.description}</p>
                <ul>
                  {card.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a href="/pieteikties/">
                  Pieteikt
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.kitchenSection} aria-labelledby="kitchen-title">
        <div className={styles.kitchenIntro}>
          <span className={styles.kitchenIcon}>
            <Image
              src="/images/custom-icons/crocheted-flame-icon.png"
              alt=""
              width={1024}
              height={1024}
              sizes="74px"
            />
          </span>
          <div>
            <h2 id="kitchen-title">Īpašie piedāvājumi Lauku ķēķī</h2>
            <p>
              Degustācijas un meistarklases top ap dzīvu uguni, pagalma ievārījumu,
              īpašu tēju un vecmāmiņas receptēm.
            </p>
          </div>
        </div>

        <div className={styles.kitchenGrid}>
          {kitchenCards.map((card) => (
            <article className={styles.kitchenCard} key={card.title}>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
              <div className={styles.kitchenMeta}>
                <strong>{card.price}</strong>
                <span>{card.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.bookingBand} aria-labelledby="booking-title">
        <div>
          <h2 id="booking-title">Sarunāsim datumu, grupu un sajūtu.</h2>
          <p>
            LaLu labākās ciemošanās top pēc īsas sarunas: cik cilvēku būs, kas
            viņus interesē un vai vajadzīga degustācija, meistarklase vai piknika
            vieta.
          </p>
        </div>
        <div className={styles.bookingNotes}>
          {bookingNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>

      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
