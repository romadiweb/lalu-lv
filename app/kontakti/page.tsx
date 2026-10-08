import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/footer/site-footer";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

const address = "Sakas iela 15, Aizpute, Dienvidkurzemes novads";
const phone = "+371 26878579";
const email = "laila@lalu.lv";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Sakas%20iela%2015%2C%20Aizpute%2C%20Dienvidkurzemes%20novads%2C%20Latvia";
const mapsEmbedUrl =
  "https://www.google.com/maps?q=Sakas%20iela%2015%2C%20Aizpute%2C%20Dienvidkurzemes%20novads%2C%20Latvia&output=embed";

export const metadata: Metadata = {
  title: "Kontakti | LaLu",
  description:
    "Sazinies ar LaLu radošo darbnīcu Aizputē par ciemošanos, meistarklasēm, ekskursijām, pasūtījumiem un Fantāzijas ziediem.",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8.4 5.2 6.7 6.9c-.5.5-.6 1.2-.3 1.8 1.8 3.8 4.8 6.9 8.7 8.8.6.3 1.3.2 1.8-.3l1.7-1.7c.5-.5.6-1.3.2-1.9l-1.2-1.9c-.4-.6-1.1-.8-1.7-.6l-2 .7a12.3 12.3 0 0 1-3.7-3.7l.7-2c.2-.7 0-1.4-.6-1.7L8.4 3.9c-.6-.4-1.4-.3-2 .3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.5 7.5h15v9h-15z" />
      <path d="m5.2 8 6.8 5.1L18.8 8" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 20s6-5.1 6-10a6 6 0 0 0-12 0c0 4.9 6 10 6 10Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14.2 8.2h2.1V4.7c-.4-.1-1.7-.2-3.2-.2-3.2 0-5.3 1.9-5.3 5.4v3H4.3v3.9h3.5v8.7h4.2v-8.7h3.4l.5-3.9H12v-2.6c0-1.1.3-2.1 2.2-2.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.4" cy="7.7" r=".8" />
    </svg>
  );
}

function IconRoll({ children }: { children: ReactNode }) {
  return (
    <span className={styles.iconRoll} aria-hidden="true">
      <span>
        {children}
        {children}
      </span>
    </span>
  );
}

const contactFacts = [
  {
    label: "Tālrunis",
    value: phone,
    href: "tel:+37126878579",
    icon: <PhoneIcon />,
  },
  {
    label: "E-pasts",
    value: email,
    href: `mailto:${email}`,
    icon: <MailIcon />,
  },
  {
    label: "Adrese",
    value: address,
    href: mapsUrl,
    icon: <MapIcon />,
  },
];

const reasons = [
  {
    title: "Ciemošanās un ekskursijas",
    text: "Pastāsti par grupas lielumu, vēlamo datumu un vai interesē darbnīcas apskate, Vectēva stāsts vai pagalma piedzīvojumi.",
  },
  {
    title: "Meistarklases un svētki",
    text: "Kopīgi var vienoties par radošu nodarbību, degustāciju, dzimšanas dienu, nometni vai īpašu notikumu LaLu noskaņā.",
  },
  {
    title: "Pasūtījumi un ziedi",
    text: "Raksti par rokdarbiem, individuāliem darinājumiem, lielformāta Fantāzijas ziediem, nomu vai svētku dekoru idejām.",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/laludarbnica/?locale=lv_LV",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/darbnicalalu/",
    Icon: InstagramIcon,
  },
];

export default function KontaktiPage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroCopy}>
          <h1 id="contact-title">Sazinies ar LaLu</h1>
          <p>
            Radošā darbnīca Aizputē uzņem ciemiņus, veido meistarklases, ekskursijas,
            pasākumus un rokām darinātus darbus ar savu neatkārtojamo rokrakstu.
            Vislabākā saruna sākas ar zvanu vai īsu ziņu par tavu ieceri.
          </p>

          <dl className={styles.factGrid} aria-label="LaLu kontaktinformācija">
            {contactFacts.map((fact) => (
              <div className={styles.factCard} key={fact.label}>
                <dt>
                  <span>{fact.icon}</span>
                  {fact.label}
                </dt>
                <dd>
                  <a href={fact.href} rel={fact.label === "Adrese" ? "noreferrer" : undefined} target={fact.label === "Adrese" ? "_blank" : undefined}>
                    {fact.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.socialCtaRow} aria-label="LaLu sociālie tīkli">
            {socialLinks.map((social) => (
              <a href={social.href} key={social.label} rel="noreferrer" target="_blank">
                <span className={styles.socialIconRoll} aria-hidden="true">
                  <span>
                    <social.Icon />
                    <social.Icon />
                  </span>
                </span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.mapPanel} aria-label="LaLu atrašanās vieta kartē">
          <div className={styles.mapHeader}>
            <div>
              <h2>Radošā darbnīca Aizputē</h2>
              <p>{address}</p>
            </div>
            <a href={mapsUrl} rel="noreferrer" target="_blank">
              Atvērt karti
              <IconRoll>
                <ArrowIcon />
              </IconRoll>
            </a>
          </div>
          <div className={styles.mapBody}>
            <iframe
              className={styles.map}
              title="LaLu radošā darbnīca kartē"
              src={mapsEmbedUrl}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className={styles.mapNote} aria-hidden="true">
              <span>Google Maps</span>
              <strong>Sakas iela 15, Aizpute</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intentSection} aria-labelledby="intent-title">
        <div className={styles.intentIntro}>
          <h2 id="intent-title">Par ko vēlies parunāt?</h2>
          <p>
            Piesakot apmeklējumu vai pasūtījumu, palīdzēs dažas detaļas: datums,
            cilvēku skaits, vecums, svētku noskaņa vai iecerētā dāvana.
          </p>
        </div>

        <div className={styles.reasonGrid}>
          {reasons.map((reason) => (
            <article className={styles.reasonCard} key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.visitBand} aria-label="LaLu radošā darbnīca Aizputē">
        <div className={styles.visitMedia}>
          <Image
            src="/images/darbnica_lalu_eka_2021_web-800x450.jpg"
            alt="LaLu radošās darbnīcas ēka Aizputē"
            fill
            sizes="(max-width: 980px) calc(100vw - 56px), 430px"
          />
        </div>
      </section>

      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
