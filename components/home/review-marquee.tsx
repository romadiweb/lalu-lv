"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  name: string;
  quote: string | null;
  size: "compact" | "medium" | "wide";
};

const reviews: Review[] = [
  {
    name: "Jolanta G.",
    quote:
      "Ļoti jauka vieta, burvīgas pašdarinātas lellītes un arī ļoti interesanta senlietu kolekcija.",
    size: "wide",
  },
  {
    name: "Līga Z.",
    quote: "Burvīga, ideju pilna un radoša vieta Aizputē.",
    size: "medium",
  },
  {
    name: "Diana D.",
    quote: "Ļoti silta sagaidīšana. Interesanta prezentācija un ļoti laba fantāzija.",
    size: "wide",
  },
  {
    name: "Sandija A.",
    quote: "Ļoti skaista vieta, fantastiski pasniegts stāstījums un jauka, sirsnīga vadītāja.",
    size: "wide",
  },
  {
    name: "Māra V.",
    quote: "Iesaku ģimenēm. Jauniešiem var pieteikt radošās darbnīcas.",
    size: "medium",
  },
  {
    name: "Sandra K.",
    quote: "Bērniem patika atrakcijas, interesantā pasaku taka un izveidotais namiņš.",
    size: "wide",
  },
  {
    name: "Ivars L.",
    quote: "Izcili skaista vieta!",
    size: "compact",
  },
  {
    name: "Oksana H.",
    quote: null,
    size: "compact",
  },
  {
    name: "Gunita B.",
    quote: null,
    size: "compact",
  },
];

const reviewRows = [
  reviews.filter((_, index) => index % 2 === 0),
  reviews.filter((_, index) => index % 2 !== 0),
];

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m8 1.2 2.02 4.1 4.53.66-3.28 3.2.78 4.51L8 11.54l-4.05 2.13.78-4.51-3.28-3.2 4.53-.66L8 1.2Z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={`review-card review-card--${review.size}`}>
      <div className="review-card-heading">
        <span className="review-avatar" aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <span>
          <strong>{review.name}</strong>
          <small>Google atsauksme</small>
        </span>
      </div>
      <div className="review-stars" aria-label="5 no 5 zvaigznēm">
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} />
        ))}
      </div>
      {review.quote ? (
        <p>“{review.quote}”</p>
      ) : (
        <p className="review-rating-only">
          <strong>5,0</strong>
          <span>Piecu zvaigžņu vērtējums</span>
        </p>
      )}
    </article>
  );
}

function ReviewRow({ row }: { row: Review[] }) {
  return (
    <div className="review-row">
      <div className="review-track">
        {[0, 1].map((copyIndex) => (
          <div className="review-group" aria-hidden={copyIndex === 1} key={copyIndex}>
            {row.map((review) => (
              <ReviewCard key={`${copyIndex}-${review.name}`} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewMarquee() {
  const panelRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    let isIntersecting = true;
    const syncMotion = () => setIsActive(isIntersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        syncMotion();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(panel);
    document.addEventListener("visibilitychange", syncMotion);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  return (
    <section
      className={`hero-lower-panel${isActive ? "" : " is-paused"}`}
      aria-labelledby="review-panel-title"
      ref={panelRef}
    >
      <div className="review-panel-intro">
        <h2 id="review-panel-title">Ko saka mūsu viesi</h2>
        <p>Patiesas Google atsauksmes no cilvēkiem, kuri darbnīcu piedzīvojuši klātienē.</p>
      </div>
      <div className="review-marquee">
        {reviewRows.map((row, index) => (
          <ReviewRow key={index} row={row} />
        ))}
      </div>
    </section>
  );
}
