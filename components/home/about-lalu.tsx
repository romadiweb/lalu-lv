import Image from "next/image";
import styles from "./about-lalu.module.css";

const values = [
  {
    title: "Roku darbs",
    copy: "Katrs darbs top ar rokām un savu raksturu.",
    image: "/images/about-lalu/roku-darbs.png",
    alt: "Tamborēts zieds krēmkrāsā un maigā lavandas tonī",
  },
  {
    title: "Dabiski materiāli",
    copy: "Koks, dzija un materiāli ar īstu sajūtu.",
    image: "/images/about-lalu/dabiski-materiali.png",
    alt: "Gaiša koka sirds ar izgrebtu vidu",
  },
  {
    title: "Pašu idejas",
    copy: "Darbi, kas rodas tepat darbnīcā.",
    image: "/images/about-lalu/pasu-idejas.png",
    alt: "Ar rokām veidots fantāzijas zieds",
  },
  {
    title: "Latviskais",
    copy: "Raksti, simboli un vietējais rokraksts.",
    image: "/images/about-lalu/latviskais.png",
    alt: "Zieds no sarkanbalti rakstītas austas lentes",
  },
  {
    title: "Radīts Aizputē",
    copy: "Mazā darbnīcā ar lielu uzmanību detaļām.",
    image: "/images/about-lalu/radits-aizpute.png",
    alt: "Krēmkrāsas tamborēts lācītis ar lavandas šalli",
  },
];

export function AboutLalu() {
  return (
    <section className={styles.section} aria-labelledby="about-lalu-title">
      <div className={styles.panel}>
        <h2 id="about-lalu-title">Mazās detaļās dzīvo rokraksts.</h2>

        <div className={styles.values}>
          {values.map((value) => (
            <article className={styles.value} key={value.title}>
              <div className={styles.visual}>
                <Image
                  className={styles.image}
                  src={value.image}
                  alt={value.alt}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 580px) 116px, (max-width: 980px) 180px, 220px"
                />
              </div>
              <div className={styles.copy}>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
