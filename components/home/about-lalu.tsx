import Image from "next/image";
import styles from "./about-lalu.module.css";

const values = [
  {
    title: "Roku darbs",
    copy: "Katrs darbs top ar rokām un savu raksturu.",
    image: "/images/about-lalu/landing-wood-icon-1.avif",
    alt: "Koka zieds ar tamborētu lavandas krāsas viduci",
  },
  {
    title: "Dabiski materiāli",
    copy: "Koks, dzija un materiāli ar īstu sajūtu.",
    image: "/images/about-lalu/landing-wood-icon-2.avif",
    alt: "Koka dēļi, dzijas kamols un tamboradata",
  },
  {
    title: "Pašu idejas",
    copy: "Darbi, kas rodas tepat darbnīcā.",
    image: "/images/about-lalu/landing-wood-icon-5.avif",
    alt: "Amatniecības darbarīki un adīti cimdi koka rotājumā",
  },
  {
    title: "Latviskais",
    copy: "Raksti, simboli un vietējais rokraksts.",
    image: "/images/about-lalu/landing-wood-icon-3.avif",
    alt: "Koka rozete ar sarkanbaltiem latviskiem rakstiem",
  },
  {
    title: "Radīts Aizputē",
    copy: "Mazā darbnīcā ar lielu uzmanību detaļām.",
    image: "/images/about-lalu/landing-wood-icon-4.avif",
    alt: "Dekoratīva koka darbnīcas mājiņa ar lavandas ziediem",
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
                  width={768}
                  height={768}
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
