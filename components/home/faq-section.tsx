"use client";

import { useState } from "react";
import styles from "./faq-section.module.css";

const faqItems = [
  {
    question: "Vai visi LaLu darbi ir darināti ar rokām?",
    answer:
      "Jā, LaLu izstrādājumi top radošajā darbnīcā, katram piešķirot savu raksturu. Nelielas atšķirības ir dabiska roku darba daļa un padara katru darinājumu īpašu.",
  },
  {
    question: "Kā varu iegādāties LaLu darinājumus?",
    answer:
      "Pieejamos darbus vari apskatīt LaLu interneta veikalā. Tur atradīsi rotaļlietas, adījumus, atstarotājus, magnētiņus, Fantāzijas ziedus un citus radošus atradumus.",
  },
  {
    question: "Vai iespējams pasūtīt individuālu darbu?",
    answer:
      "Jā, individuāli darinājumi ir pieejami pēc vienošanās. Pastāsti par savu ieceri, vēlamo noskaņu un termiņu, lai kopā varam atrast piemērotāko risinājumu.",
  },
  {
    question: "Kā pieteikties meistarklasei?",
    answer:
      "Meistarklašu sadaļā vari iepazīties ar aktuālajiem piedāvājumiem un izvēlēties sev piemērotāko radošo nodarbību. Ja nepieciešama palīdzība, sazinies ar LaLu.",
  },
  {
    question: "Vai LaLu darbnīcu var apmeklēt ekskursijā?",
    answer:
      "Jā, LaLu piedāvā iespēju ciemoties darbnīcā un iepazīt tās radošo pasauli. Ekskursijas sadaļā atradīsi informāciju par pieteikšanos.",
  },
  {
    question: "Kur atrodas LaLu darbnīca?",
    answer:
      "LaLu darbnīca atrodas Cepļa ielā 4–9, Aizputē, Dienvidkurzemes novadā. Pirms ciemošanās aicinām iepriekš sazināties.",
  },
];

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m7 9.5 5 5 5-5" />
    </svg>
  );
}

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <h2 id="faq-title">Biežāk uzdotie jautājumi</h2>

      <div className={styles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openItem === index;
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;

          return (
            <div
              className={`${styles.item}${isOpen ? ` ${styles.open}` : ""}`}
              key={item.question}
            >
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                className={styles.question}
                id={questionId}
                type="button"
                onClick={() => setOpenItem(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronIcon />
              </button>
              <div
                aria-hidden={!isOpen}
                aria-labelledby={questionId}
                className={styles.answer}
                id={answerId}
                role="region"
              >
                <div className={styles.answerInner}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
