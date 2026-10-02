import Link from "next/link";
import styles from "./about-lalu.module.css";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export function AboutLalu() {
  return (
    <section className={styles.section} aria-labelledby="about-lalu-title">
      <div className={styles.inner}>
        <h2 id="about-lalu-title">LaLu ir vieta, kur idejas iegūst savu rokrakstu.</h2>
        <div className={styles.copy}>
          <p>
            LaLu radošajā darbnīcā Aizputē top ar rokām darināti tēli, rotaļlietas un mazi
            pārsteigumi — katrs ar savu raksturu.
          </p>
          <p>
            Te var ne tikai ieraudzīt gatavos darbus, bet arī piedalīties meistarklasēs,
            doties ekskursijā un atklāt, kā no idejas soli pa solim rodas kaut kas īpašs.
          </p>
          <Link className={styles.link} href="/par-mums/">
            Iepazīsti LaLu tuvāk
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
