"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Workshop } from "@/lib/content-types";
import styles from "./page.module.css";

export function WorkshopCarousel({ workshops }: { workshops: Workshop[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateControls = () => {
      setShowControls(track.scrollWidth > track.clientWidth + 4);
    };

    updateControls();

    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(track);

    Array.from(track.children).forEach((child) => {
      resizeObserver.observe(child);
    });

    window.addEventListener("resize", updateControls);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateControls);
    };
  }, [workshops.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>("[data-workshop-card]");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 18;
    const nextLeft = track.scrollLeft + direction * (cardWidth + gap);
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (direction > 0 && nextLeft >= maxScrollLeft - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && nextLeft <= 0 && workshops.length > 1) {
      track.scrollTo({
        left: Math.max(0, maxScrollLeft),
        behavior: "smooth",
      });
      return;
    }

    track.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
  };

  return (
    <div className={styles.carouselShell}>
      {showControls ? (
        <div className={styles.carouselControls} aria-label="Meistarklašu karuselis">
          <button type="button" aria-label="Iepriekšējā meistarklase" onClick={() => scrollByCard(-1)}>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M9 3 5 7l4 4" />
            </svg>
          </button>
          <button type="button" aria-label="Nākamā meistarklase" onClick={() => scrollByCard(1)}>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="m5 3 4 4-4 4" />
            </svg>
          </button>
        </div>
      ) : null}

      <div className={styles.masterclassGrid} ref={trackRef}>
        {workshops.map((item) => (
          <article className={styles.masterclassCard} data-workshop-card key={item.id}>
            <div className={styles.masterclassImageWrap}>
              <Image
                className={styles.masterclassImage}
                src={item.image_url}
                alt={item.image_alt}
                fill
                sizes="(max-width: 700px) 78vw, (max-width: 1100px) 38vw, 260px"
              />
            </div>
            <div className={styles.masterclassCopy}>
              <h2>{item.title}</h2>
              <p>{item.intro}</p>
              <ul>
                {item.details.slice(0, 3).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <dl>
                <div>
                  <dt>Ilgums</dt>
                  <dd>{item.duration_label}</dd>
                </div>
                <div>
                  <dt>Maksa</dt>
                  <dd>{item.price_label}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
