"use client";

import { useEffect, useRef, useState } from "react";
import type { HomepageReview } from "@/lib/content-types";

function getReviewSize(review: HomepageReview) {
  if (!review.quote || review.quote.length <= 28) return "compact";
  if (review.quote.length <= 68) return "medium";
  return "wide";
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m8 1.2 2.02 4.1 4.53.66-3.28 3.2.78 4.51L8 11.54l-4.05 2.13.78-4.51-3.28-3.2 4.53-.66L8 1.2Z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: HomepageReview }) {
  const size = getReviewSize(review);

  return (
    <article className={`review-card review-card--${size}`}>
      <div className="review-card-heading">
        <span className="review-avatar" aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <span>
          <strong>{review.name}</strong>
          <small>{review.source_label}</small>
        </span>
      </div>
      <div className="review-stars" aria-label={`${review.rating} no 5 zvaigznēm`}>
        {Array.from({ length: review.rating }, (_, index) => (
          <StarIcon key={`${review.id}-star-${index}`} />
        ))}
      </div>
      {review.quote ? (
        <p>“{review.quote}”</p>
      ) : (
        <p className="review-rating-only">
          <strong>{review.rating.toFixed(1).replace(".", ",")}</strong>
          <span>{review.rating} zvaigžņu vērtējums</span>
        </p>
      )}
    </article>
  );
}

function ReviewRow({ row }: { row: HomepageReview[] }) {
  return (
    <div className="review-row">
      <div className="review-track">
        {[0, 1].map((copyIndex) => (
          <div className="review-group" aria-hidden={copyIndex === 1} key={copyIndex}>
            {row.map((review) => (
              <ReviewCard key={`${copyIndex}-${review.id}`} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewMarquee({ reviews }: { reviews: HomepageReview[] }) {
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

  if (reviews.length === 0) {
    return null;
  }

  const reviewRows = reviews.length === 1
    ? [reviews]
    : [
        reviews.filter((_, index) => index % 2 === 0),
        reviews.filter((_, index) => index % 2 !== 0),
      ];

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
