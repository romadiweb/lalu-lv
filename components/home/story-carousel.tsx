"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./story-carousel.module.css";

const VIDEO_ID = "Gs507EVZiOc";
const VIDEO_TITLE = "Aizputes novada rokdarbu izstādes atklāšana";
const STORY_COUNT = 6;
const INITIAL_STORY_INDEX = Math.floor(STORY_COUNT / 2);

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
  const scrollUpdateFrameRef = useRef<number | null>(null);
  const dragState = useRef({
    startX: 0,
    startScrollLeft: 0,
    startIndex: INITIAL_STORY_INDEX,
    dragging: false,
  });
  const [activeIndex, setActiveIndex] = useState(INITIAL_STORY_INDEX);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (scrollUpdateFrameRef.current !== null) {
        cancelAnimationFrame(scrollUpdateFrameRef.current);
      }
    };
  }, []);

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

  const getLoopedIndex = (index: number) => (index + STORY_COUNT) % STORY_COUNT;

  const settleToCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const cards = getCards(viewport);
    const targetIndex = getLoopedIndex(index);
    const card = cards[targetIndex];

    if (!card) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const targetLeft = Math.max(
      0,
      Math.min(maxScrollLeft, card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2),
    );
    viewport.classList.remove(styles.dragging);

    viewport.scrollTo({
      left: targetLeft,
      behavior: reducedMotion ? "auto" : behavior,
    });
    setActiveIndex(targetIndex);
  };

  const updateActiveCard = () => {
    const viewport = viewportRef.current;

    if (!viewport || dragState.current.dragging || scrollUpdateFrameRef.current !== null) {
      return;
    }

    scrollUpdateFrameRef.current = requestAnimationFrame(() => {
      scrollUpdateFrameRef.current = null;

      const currentViewport = viewportRef.current;

      if (!currentViewport || dragState.current.dragging) {
        return;
      }

      const closestIndex = getClosestCardIndex(currentViewport);
      setActiveIndex((currentIndex) =>
        currentIndex === closestIndex ? currentIndex : closestIndex,
      );
    });
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-story-card]"));
    const card = cards[INITIAL_STORY_INDEX];

    if (!card) {
      return;
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollLeft = Math.max(
      0,
      Math.min(
        maxScrollLeft,
        card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2,
      ),
    );
  }, []);

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
    const direction = dragDistance > 0 ? 1 : -1;
    const targetIndex =
      Math.abs(dragDistance) >= advanceThreshold
        ? getLoopedIndex(dragState.current.startIndex + direction)
        : getClosestCardIndex(viewport);

    settleToCard(targetIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      settleToCard(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      settleToCard(activeIndex - 1);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="stories-title">
      <div className={styles.headingBlock}>
        <h2 id="stories-title">Stāstos un kadros</h2>
        <p>Noskaties video vai iepazīsti darbnīcas darbus Latvijas mediju stāstos.</p>
        <div className={styles.controls} aria-label="Karuseļa vadība">
          <button
            aria-label="Iepriekšējais stāsts"
            type="button"
            onClick={() => settleToCard(activeIndex - 1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            aria-label="Nākamais stāsts"
            type="button"
            onClick={() => settleToCard(activeIndex + 1)}
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
              src="/images/story-thumbnails/la-lv-lustes.webp"
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

          <article className={`${styles.card} ${styles.articleCard}`} data-story-card>
            <Image
              alt="LaLu radošā darbnīca Aizputē"
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 860px"
              src="/images/story-thumbnails/retv-lalu-darbnica.webp"
            />
            <div className={styles.cardShade} />
            <div className={styles.cardCopy}>
              <span>Raksts un video · ReTV</span>
              <h3>Aizputes rokdarbniece Laila Luzere izveido radošo darbnīcu</h3>
              <p>ReTV stāsts par Lailas Luzeres radošo darbnīcu, senlietām un rokdarbiem.</p>
              <a
                className={styles.underlinedAction}
                href="https://retv.lv/raksts/aizputes-rokdarbniece-laila-luzere-izveido-radoso-darbnicu/"
                rel="noreferrer"
                target="_blank"
              >
                Lasīt un skatīties
                <ArrowIcon direction="right" />
              </a>
            </div>
          </article>

          <article className={`${styles.card} ${styles.articleCard}`} data-story-card>
            <Image
              alt="LaLu radošā darbnīca Aizputē"
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 860px"
              src="/images/story-thumbnails/liepajniekiem-laila-luzere.webp"
            />
            <div className={styles.cardShade} />
            <div className={styles.cardCopy}>
              <span>Publikācija · Liepājniekiem.lv</span>
              <h3>Foto: Rokdarbnieces Lailas Luzeres darbs ir svētki</h3>
              <a
                className={styles.underlinedAction}
                href="https://www.liepajniekiem.lv/tema/laila-luzere/"
                rel="noreferrer"
                target="_blank"
              >
                Lasīt publikāciju
                <ArrowIcon direction="right" />
              </a>
            </div>
          </article>

          <article className={`${styles.card} ${styles.articleCard}`} data-story-card>
            <Image
              alt="LaLu radošās darbnīcas ēka Aizputē"
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 860px"
              src="/images/story-thumbnails/lasi-kur-jaunais-sastopas.webp"
            />
            <div className={styles.cardShade} />
            <div className={styles.cardCopy}>
              <span>Raksts · Lasi.lv</span>
              <h3>Kur jaunais sastopas ar veco</h3>
              <p>Stāsts par privātkolekciju, senatnes elpu un LaLu darbnīcas tapšanu.</p>
              <a
                className={styles.underlinedAction}
                href="https://lasi.lv/maja-gimene/majas-viesis/kur-jaunais-sastopas-ar-veco-privatkolekcija-ar-senatnes-elpu.11377"
                rel="noreferrer"
                target="_blank"
              >
                Lasīt rakstu
                <ArrowIcon direction="right" />
              </a>
            </div>
          </article>

          <article className={`${styles.card} ${styles.articleCard}`} data-story-card>
            <Image
              alt="LaLu radošā darbnīca Aizputē"
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 860px"
              src="/images/story-thumbnails/dienvidkurzeme-lalu.webp"
            />
            <div className={styles.cardShade} />
            <div className={styles.cardCopy}>
              <span>Tūrisms · Dienvidkurzeme Travel</span>
              <h3>Veikals un radošā darbnīca LaLu</h3>
              <p>Tūrisma ieraksts par darbnīcu, rokdarbiem, pasākumiem un ciemošanos Aizputē.</p>
              <a
                className={styles.underlinedAction}
                href="https://www.dienvidkurzeme.travel/visainfo/item/majrazotaji-un-amatnieki/vietejo-labumu-veikali/radosa-darbnica-lalu-3/"
                rel="noreferrer"
                target="_blank"
              >
                Skatīt ierakstu
                <ArrowIcon direction="right" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
