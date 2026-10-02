"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./story-carousel.module.css";

const VIDEO_ID = "Gs507EVZiOc";
const VIDEO_TITLE = "Aizputes novada rokdarbu izstādes atklāšana";
const STORY_COUNT = 2;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? styles.arrowLeft : undefined}
      viewBox="0 0 20 20"
    >
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m9 7 8 5-8 5V7Z" />
    </svg>
  );
}

export function StoryCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isSettlingRef = useRef(false);
  const dragState = useRef({
    startX: 0,
    startScrollLeft: 0,
    startIndex: 0,
    dragging: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const stopSettling = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    isSettlingRef.current = false;
  };

  const getCards = (viewport: HTMLDivElement) =>
    Array.from(viewport.querySelectorAll<HTMLElement>("[data-story-card]"));

  const getClosestCardIndex = (viewport: HTMLDivElement) => {
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const cards = getCards(viewport);

    return cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closest];
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;

      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
        ? index
        : closest;
    }, 0);
  };

  const settleToCard = (index: number) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const cards = getCards(viewport);
    const card = cards[index];

    if (!card) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const targetLeft = Math.max(
      0,
      Math.min(maxScrollLeft, card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2),
    );
    const startLeft = viewport.scrollLeft;
    const distance = targetLeft - startLeft;

    stopSettling();

    if (reducedMotion || Math.abs(distance) < 1) {
      viewport.classList.remove(styles.dragging);
      viewport.classList.remove(styles.settling);
      viewport.scrollLeft = targetLeft;
      setActiveIndex(index);
      return;
    }

    const duration = Math.min(520, Math.max(320, Math.abs(distance) * 0.52));
    const startedAt = performance.now();
    isSettlingRef.current = true;
    viewport.classList.add(styles.settling);
    viewport.classList.remove(styles.dragging);

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const easedProgress = 1 - Math.pow(1 - progress, 5);
      viewport.scrollLeft = startLeft + distance * easedProgress;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      animationFrameRef.current = null;
      isSettlingRef.current = false;
      viewport.classList.remove(styles.settling);
      viewport.scrollLeft = targetLeft;
      setActiveIndex(index);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const updateActiveCard = () => {
    const viewport = viewportRef.current;

    if (!viewport || dragState.current.dragging || isSettlingRef.current) {
      return;
    }

    setActiveIndex(getClosestCardIndex(viewport));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("button, a, iframe")) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    stopSettling();
    viewport.classList.remove(styles.settling);
    dragState.current = {
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      startIndex: activeIndex,
      dragging: true,
    };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add(styles.dragging);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || !dragState.current.dragging) {
      return;
    }

    viewport.scrollLeft =
      dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || !dragState.current.dragging) {
      return;
    }

    dragState.current.dragging = false;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    const cards = getCards(viewport);
    const startingCard = cards[dragState.current.startIndex];
    const dragDistance = viewport.scrollLeft - dragState.current.startScrollLeft;
    const advanceThreshold = Math.min((startingCard?.offsetWidth ?? 640) * 0.14, 110);
    const targetIndex =
      Math.abs(dragDistance) >= advanceThreshold
        ? Math.max(
            0,
            Math.min(
              STORY_COUNT - 1,
              dragState.current.startIndex + (dragDistance > 0 ? 1 : -1),
            ),
          )
        : getClosestCardIndex(viewport);

    settleToCard(targetIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      settleToCard(Math.min(activeIndex + 1, STORY_COUNT - 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      settleToCard(Math.max(activeIndex - 1, 0));
    }
  };

  return (
    <section className={styles.section} aria-labelledby="stories-title">
      <div className={styles.headingBlock}>
        <h2 id="stories-title">LaLu stāstos un kadros</h2>
        <p>Noskaties video vai iepazīsti LaLu darbus Latvijas mediju stāstos.</p>
        <div className={styles.controls} aria-label="Karuseļa vadība">
          <button
            aria-label="Iepriekšējais stāsts"
            disabled={activeIndex === 0}
            type="button"
            onClick={() => settleToCard(Math.max(activeIndex - 1, 0))}
          >
            <ArrowIcon direction="left" />
          </button>
          <span aria-live="polite">
            {activeIndex + 1} / {STORY_COUNT}
          </span>
          <button
            aria-label="Nākamais stāsts"
            disabled={activeIndex === STORY_COUNT - 1}
            type="button"
            onClick={() => settleToCard(Math.min(activeIndex + 1, STORY_COUNT - 1))}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        aria-label="LaLu video un raksti. Velc horizontāli vai izmanto bultiņu taustiņus."
        className={styles.viewport}
        ref={viewportRef}
        role="region"
        tabIndex={0}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        onPointerCancel={finishDrag}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onScroll={updateActiveCard}
      >
        <div className={styles.track}>
          <article className={`${styles.card} ${styles.videoCard}`} data-story-card>
            {isPlaying ? (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.videoFrame}
                referrerPolicy="strict-origin-when-cross-origin"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title={VIDEO_TITLE}
              />
            ) : (
              <>
                <Image
                  alt="Aizputes novada rokdarbu izstādes video priekšskatījums"
                  className={styles.cardImage}
                  draggable={false}
                  fill
                  sizes="(max-width: 720px) calc(100vw - 48px), 860px"
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                />
                <div className={styles.cardShade} />
                <button
                  aria-label={`Atskaņot video: ${VIDEO_TITLE}`}
                  className={styles.playButton}
                  type="button"
                  onClick={() => setIsPlaying(true)}
                >
                  <PlayIcon />
                </button>
                <div className={styles.cardCopy}>
                  <span>Video · Aizputes TV</span>
                  <h3>{VIDEO_TITLE}</h3>
                  <button className={styles.underlinedAction} type="button" onClick={() => setIsPlaying(true)}>
                    Skatīties video
                  </button>
                </div>
              </>
            )}
          </article>

          <article className={`${styles.card} ${styles.articleCard}`} data-story-card>
            <Image
              alt="Amatnieku darinājumi Vērmaņdārza gadatirgū"
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 860px"
              src="https://lastatic.ams3.cdn.digitaloceanspaces.com/2013/10/g1/Tirdzins_KM_72.jpg"
            />
            <div className={styles.cardShade} />
            <div className={styles.cardCopy}>
              <span>Raksts · LA.LV</span>
              <h3>Lustes un andele Vērmanītī</h3>
              <p>Laila Luzere par saviem darinājumiem Dziesmu un deju svētku gadatirgū.</p>
              <a
                className={styles.underlinedAction}
                href="https://www.la.lv/lustes-un-andele-vermaniti-3/"
                rel="noreferrer"
                target="_blank"
              >
                Lasīt rakstu
                <ArrowIcon direction="right" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
