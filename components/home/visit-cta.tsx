import Link from "next/link";
import styles from "./visit-cta.module.css";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export function VisitCta() {
  return (
    <section className={styles.section} aria-labelledby="visit-cta-title">
      <div className={styles.panel}>
        <h2 id="visit-cta-title">Atbrauc ciemos uz darbnīcu</h2>
        <div className={styles.content}>
          <p>
            Iepazīsti radošo darbnīcu, “Vectēva stāstu” un pagalmu, kur kopā var
            darboties, atklāt un piedzīvot. Uzņemam ģimenes, skolēnu un pieaugušo
            grupas — apmeklējumu piesaki iepriekš.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/pieteikties/">
              Pieteikt ciemošanos
              <ArrowIcon />
            </Link>
            <a
              className={styles.secondaryAction}
              href="https://www.facebook.com/laludarbnica/?locale=lv_LV"
              rel="noreferrer"
              target="_blank"
            >
              Jaunumi Facebook
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
