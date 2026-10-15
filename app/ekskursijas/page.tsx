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
    "LaLu radošās darbnīcas ekskursijas, Vectēva stāsts, pagalma piedzīvojumi, Lauku ķēķa pieredze un meistarklases Aizputē.",
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
      "Radošajā darbnīcā LaLu apskatāmi un iegādājami amatnieces darinātie darbi ar īpašu, neatkārtojamu rokrakstu un oriģinalitāti.",
    details: [
      "Adīti, tamborēti, šūti, tapoti, filcēti, veidoti un pērļoti darbi",
      "Katrs darbs ir roku darbs - unikāls un neatkārtojams",
      "Skaistums, kvalitāte un sirds siltums",
    ],
    icon: "/images/custom-icons/Cozy Crochet Teddy Craft Table.png",
  },
  {
    title: "Pagalma piedzīvojumi un Vectēva stāsts",
    kicker: "Atklāj un piedzīvo",
    price: "",
    description:
      "Atklāj neparasto, izmēģini ko jaunu un iepazīsti senlietu kolekciju gandrīz 100 gadus vecā mājā. Saimnieces stāsti par lietām, cilvēkiem un notikumiem savijas ar darbošanos un kopā būšanas prieku.",
    details: [
      "Pagalma piedzīvojumi — programma un cena pēc vienošanās; aktivitātes pielāgojam vecumam un interesēm",
      "Vectēva stāsts — pieaugušajiem 4 €, bērniem 3 €",
      "Seni sadzīves priekšmeti, darba rīki un rokdarbi no pirmskara gadiem līdz padomju laikam",
      "Radošums, pārsteigumi un atmiņas, ko paņemt līdzi",
    ],
    icon: "/images/custom-icons/Miniature Woodland Discovery Diorama.png",
  },
  {
    title: "Puķu nams",
    kicker: "Tava īpašā miera un svētku vieta",
    price: "Vieta Taviem īpašajiem mirkļiem",
    description:
      "Vai esi sapņojis par vietu, kur uz brīdi apstāties, atvilkt elpu un baudīt skaisto? Sajūta, ka šis mirklis pieder tikai Tev un Taviem cilvēkiem.",
    details: [
      "Svētkiem un dzimšanas dienām — sviniet ar ģimeni un draugiem skaistā, neierastā vidē un radiet atmiņas, ko saglabāt",
      "Draudzeņu un draugu vakariem — sarunām, smiekliem, tējai un nesteidzīgiem mirkļiem tuvāko lokā",
      "Semināriem un darba tikšanām — gaiša, iedvesmojoša vieta idejām, sarunām un jaunām iecerēm",
      "Radošajām nodarbībām un meistarklasēm — apgūsti ko jaunu un baudi kopā būšanu",
      "Sievišķīgiem un romantiskiem pasākumiem — fotosesijām, nelieliem svētkiem un īpašiem pārsteigumiem",
    ],
    icon: "/images/custom-icons/puku-nams.webp",
    flowerHouse: true,
  },
  {
    title: "Meistarklases un Lauku ķēķa pieredze",
    kicker: "Radoši un gardi",
    price: "Programma pēc sarunas",
    description:
      "Ja Tevi saista māksla, jauna apgūšana un radīšana, šis piedāvājums ir domāts tieši Tev.",
    details: [
      "Izvēlies sev tīkamāko nodarbību",
      "Cenā ietilpst visi nepieciešamie materiāli 1 personai",
      "Lauku ķēķa pieredzi var pievienot pēc sarunas",
    ],
    icon: "/images/custom-icons/Cozy Crochet Craft Still Life.png",
  },
  {
    title: "Pilns komplekts",
    kicker: "Īpašais ciemošanās maršruts",
    price: "Programma un cena pēc vienošanās",
    description:
      "Pilnā komplektā iekļautas visas ekskursijas, ēdināšana un meistarklase — viss vienā kopīgā piedzīvojumā.",
    details: [
      "Labs risinājums skolām, nometnēm un svētku grupām",
      "Saturs tiek salikts pēc vecuma, ilguma un intereses",
      "Piesaki savu grupu, un dosimies piedzīvojumā kopā",
    ],
    icon: "/images/custom-icons/crocheted-flame-icon.png",
    featured: true,
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
          <h1 id="excursion-title">Ekskursijas radošajā darbnīcā LaLu</h1>
          <p>
            Aicinām braukt ciemos uz radošo darbnīcu LaLu Aizputē: iepazīt
            rokdarbu pasauli, klausīties Vectēva stāstu, noķert īpašu sajūtu
            Puķu namā, doties pagalma piedzīvojumos vai darboties kādā no
            meistarklasēm.
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
            src="/images/ekskursijas-foto.webp"
            alt="LaLu ekskursiju piedāvājuma ilustrācija."
            width={900}
            height={1125}
            priority
            sizes="(max-width: 980px) min(100vw - 48px, 620px), 520px"
          />
        </aside>
      </section>

      <section className={styles.offerSection} aria-labelledby="offers-title">
        <div className={styles.sectionIntro}>
          <h2 id="offers-title">Izvēlies savu ciemošanās veidu</h2>
          <p>
            Piedāvājumus var kombinēt pēc grupas vecuma, interesēm un vēlamās
            sajūtas. Izvēlies savu piedzīvojumu, un programmu pielāgosim pēc
            sarunas.
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
                {card.price ? <strong>{card.price}</strong> : null}
                <p>{card.description}</p>
                <ul>
                  {card.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                {card.flowerHouse ? (
                  <>
                    <details className={styles.flowerDetails}>
                      <summary>Dienā un vakarā — visos gadalaikos</summary>
                      <p>Vasarā baudi gaismu un debesu plašumu, rudenī — lietus lāšu deju stiklā, ziemā — īpašu mājīgumu, bet vakaros ļaujies zvaigžņotās debess burvībai. Te var satikties, svinēt, radīt, sarunāties un vienkārši būt.</p>
                      <p>Izīrē privātiem pasākumiem, tikšanās reizēm un radošām aktivitātēm. Raksti un piesaki savu datumu! Kopīgi atradīsim piemērotāko risinājumu Tavam īpašajam notikumam.</p>
                      <p>Puķu nams — vieta, kur skaisti mirkļi kļūst par atmiņām.</p>
                    </details>
                    <details className={styles.flowerDetails}>
                      <summary>Puķu nama cenrādis</summary>
                      <dl className={styles.priceList}>
                        <div><dt>Pirmdiena–ceturtdiena</dt><dd>15 € / h</dd></div>
                        <div><dt>Piektdienās un brīvdienās</dt><dd>20 € / h</dd></div>
                        <div><dt>Vakars līdz 4 h</dt><dd>70 €</dd></div>
                        <div><dt>Vakars līdz 6 h</dt><dd>80 €</dd></div>
                      </dl>
                      <p>Minimālā rezervācija — 2 h. Par beigu laiku vienojamies iepriekš.</p>
                    </details>
                  </>
                ) : null}
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
                {card.price ? <strong>{card.price}</strong> : null}
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
