import Image from "next/image";
import { ReviewMarquee } from "./review-marquee";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function RollingArrowIcon() {
  return (
    <span className="rolling-arrow" aria-hidden="true">
      <ArrowIcon />
      <ArrowIcon />
    </span>
  );
}

export function OpeningPanel() {
  return (
    <section className="opening-panel" aria-labelledby="home-hero-title">
      <div className="hero-stage">
        <div className="hero-visual">
          <Image
            src="/images/rustic-knitted-cats.png"
            alt="Pie koka sienas uz veļas auklas izkārtoti LaLu adīti melnbalti kaķi."
            fill
            sizes="100vw"
            preload
          />
        </div>

        <div className="hero-content">
          <h1 id="home-hero-title">
            Radīts Latvijā.
            <br />
            <span>Radīts ar mīlestību.</span>
          </h1>

          <div className="hero-copy">
            <p>Roku darbi, meistarklases un ciemošanās darbnīcā vienā siltā vietā.</p>
            <div className="hero-actions">
              <a className="secondary-cta" href="/veikals/">
                <span>Ienāc veikalā</span>
                <RollingArrowIcon />
              </a>
              <a className="hero-secondary-cta" href="/pieteikties/">
                <span>Pieteikties ekskursijai</span>
                <RollingArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ReviewMarquee />
    </section>
  );
}
