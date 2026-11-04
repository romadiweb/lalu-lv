"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Workshop } from "@/lib/content-types";
import styles from "./page.module.css";

export function WorkshopCarousel({ workshops }: { workshops: Workshop[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

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
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const nextLeft = track.scrollLeft + direction * (cardWidth + gap);
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (direction > 0 && track.scrollLeft >= maxScrollLeft - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && track.scrollLeft <= 4 && workshops.length > 1) {
      track.scrollTo({
        left: Math.max(0, maxScrollLeft),
        behavior: "smooth",
      });
      return;
    }

    track.scrollTo({ left: Math.min(maxScrollLeft, Math.max(0, nextLeft)), behavior: "smooth" });
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
              <h2><button type="button" className={styles.cardTrigger} aria-haspopup="dialog" onClick={() => setSelectedWorkshop(item)}>{item.title}</button></h2>
              <p>{item.intro}</p>
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
              <span className={styles.readMore} aria-hidden="true">Vairāk par meistarklasi <svg viewBox="0 0 20 20"><path d="M5 15 15 5M5 5h10v10" /></svg></span>
            </div>
          </article>
        ))}
      </div>
      {selectedWorkshop ? <WorkshopDialog workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} /> : null}
    </div>
  );
}

function WorkshopDialog({ workshop, onClose }: { workshop: Workshop; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog ref={dialogRef} className={styles.workshopDialog} aria-labelledby="workshop-dialog-title" onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }
    }}>
      <div className={styles.dialogLayout}>
        <div className={styles.dialogVisual}>
          <Image src={workshop.image_url} alt={workshop.image_alt} width={900} height={900} sizes="(max-width: 700px) 100vw, 400px" />
        </div>
        <div className={styles.dialogCopy}>
          <button type="button" className={styles.dialogClose} onClick={close} aria-label="Aizvērt meistarklases aprakstu" autoFocus>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <h2 id="workshop-dialog-title">{workshop.title}</h2>
          <p className={styles.dialogIntro}>{workshop.intro}</p>
          <dl className={styles.dialogFacts}>
            <div><dt>Ilgums</dt><dd>{workshop.duration_label}</dd></div>
            <div><dt>Dalības maksa</dt><dd>{workshop.price_label}</dd></div>
          </dl>
          <div className={styles.dialogDetails}>
            {workshop.details.map((detail, index) => {
              const heading = detail.match(/^(Ko darīsim\?|Ko iegūsi\?|Kam piemērota meistarklase\?|Meistarklases norise|Materiāli un nodrošinājums)/)?.[0];
              return heading ? <section key={index}><h3>{heading}</h3>{detail.slice(heading.length).trim() ? <p>{detail.slice(heading.length).trim()}</p> : null}</section> : <p key={index}>{detail}</p>;
            })}
          </div>
          {workshop.travel_label ? <p className={styles.travelNote}>{workshop.travel_label}</p> : null}
          <Link className={styles.dialogCta} href={`${workshop.cta_href || "/pieteikties/"}${(workshop.cta_href || "").includes("?") ? "&" : "?"}veids=meistarklase&meistarklase=${encodeURIComponent(workshop.id)}`}>
            {workshop.cta_label || "Pieteikties meistarklasei"}
          </Link>
        </div>
      </div>
    </dialog>
  );
}
