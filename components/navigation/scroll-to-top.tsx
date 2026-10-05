"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./scroll-to-top.module.css";

const VISIBILITY_OFFSET = 560;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateVisibility = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > VISIBILITY_OFFSET);
        frameId = null;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document
      .querySelector<HTMLElement>('[aria-label="LaLu sākums"]')
      ?.focus({ preventScroll: true });
  };

  return (
    <button
      className={`${styles.button}${isVisible ? ` ${styles.visible}` : ""}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Atgriezties lapas sākumā"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <Image
        className={styles.arrow}
        src="/images/scroll-to-top-arrow.png"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 700px) 36px, 42px"
      />
    </button>
  );
}
