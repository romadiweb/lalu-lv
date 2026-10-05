import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/site-footer";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

const phone = "+371 26878579";
const email = "laila@lalu.lv";
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

export const metadata: Metadata = {
  title: "Ekskursijas | LaLu",
  description:
    "LaLu radošās darbnīcas ekskursijas, Vectēva stāsts, pagalma piedzīvojumi, Lauku ķēķa degustācijas un meistarklases Aizputē.",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function StudioIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path d="M5.5 12.2 14 5.8l8.5 6.4v9.9H5.5Z" />
      <path d="M10.2 22.1v-6.7h7.6v6.7" />
      <path d="M8.5 10.3V7.2h3" />
    </svg>
  );
}

function StoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path d="M7 6.2h10.2a4 4 0 0 1 4 4v11.6H10.8a4 4 0 0 0-3.8 2.8Z" />
      <path d="M7 6.2v18.4" />
      <path d="M11 11h6.4M11 15h5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path d="M14 4.8 16.5 12l6.7 2-6.7 2L14 23.2 11.5 16l-6.7-2 6.7-2Z" />
      <path d="m21.4 5.7.8 2.2 2 .7-2 .7-.8 2.2-.8-2.2-2-.7 2-.7Z" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path d="M14.8 24c4.4-.5 7-3.3 7-7.2 0-3.1-1.7-5.4-4.5-7.7.2 2.7-.7 4.3-2.4 5.5.2-3.6-1.5-6.7-4.7-9.5.4 4.7-4 6.8-4 11.7 0 3.8 2.6 6.7 6.9 7.2" />
      <path d="M11.8 23.5c-1.4-1-2.1-2.3-2.1-3.9 0-1.9 1.2-3.1 2.6-4.5.3 2.2 1.4 3.2 2.8 4.2.6-.9.9-1.9.7-3.2 1.7 1.3 2.5 2.6 2.5 4.2 0 1.4-.7 2.5-2 3.2" />
    </svg>
  );
}

const quickFacts = [
  { label: "Ekskursija", value: "4 EUR pieaugušajiem" },
  { label: "Bērniem", value: "3 EUR" },
  { label: "Lauku ķēķis", value: "7-12 EUR no personas" },
];

const visitSteps = [
  "Darbnīcas apmeklējums",
  "Vectēva stāsts",
  "Pagalma piedzīvojumi",
  "Meistarklase vai degustācija",
];

const excursionCards = [
  {
    title: "Darbnīcas apmeklējums",
    kicker: "Bezmaksas",
    price: "Iepirkšanās un apskate",
    description:
      "Ienāc LaLu darbnīcā, apskati rokdarbus un izvēlies sirsnīgu dāvanu turpat Aizputē.",
    details: ["Rokdarbu apskate", "Iespēja iepirkties", "Pēc iepriekšējas vienošanās"],
    Icon: StudioIcon,
  },
  {
    title: "Vectēva stāsts",
    kicker: "Ekskursija",
    price: "Pieaugušajiem 4 EUR, bērniem 3 EUR",
    description:
      "LaLu stāsts ar darbnīcas sajūtu, senām atmiņām un mierīgu ciemošanos nelielām grupām.",
    details: ["Stāstījums darbnīcā", "Piemērots ģimenēm un skolām", "Var apvienot ar pagalmu"],
    Icon: StoryIcon,
    featured: true,
  },
  {
    title: "Pagalma piedzīvojumi",
    kicker: "Pasaku taka",
    price: "Aktivitātes pēc vienošanās",
    description:
      "Pagalma apskate ar darbošanos, pasaku noskaņu un mazu līdzi ņemamu prieku.",
    details: ["Pelnrušķītes kurpīte", "Aktivitātes ārā", "Radošs pārsteigums līdzi"],
    Icon: SparkIcon,
  },
  {
    title: "Meistarklases",
    kicker: "Radošā darbnīca",
    price: "Programma pēc sarunas",
    description:
      "Roku darbs, kopā būšana un īpašs process dzimšanas dienām, nometnēm vai radu salidojumiem.",
    details: ["Svētki un pasākumi", "Nometnes un grupas", "Saturs pielāgots vecumam"],
    Icon: SparkIcon,
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
            <a href={`mailto:${email}?subject=Pieteikt%20ekskursiju%20LaLu`}>
              Pieteikt ekskursiju
              <ArrowIcon />
            </a>
            <a href={phoneHref}>Zvanīt LaLu</a>
          </div>
        </div>

        <aside className={styles.visitBoard} aria-label="LaLu ekskursijas īsais pārskats">
          <div className={styles.boardTop}>
            <span>Ciemošanās izvēlne</span>
            <strong>Darbnīca, pagalms un Lauku ķēķis vienā maršrutā.</strong>
          </div>
          <div className={styles.priceStack}>
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
          <ol className={styles.visitSteps}>
            {visitSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
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
                <span className={styles.iconTile}>
                  <card.Icon />
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
                <a href={`mailto:${email}?subject=${encodeURIComponent(`Pieteikt ${card.title}`)}`}>
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
            <FireIcon />
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
