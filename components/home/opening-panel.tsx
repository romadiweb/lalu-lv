import Image from "next/image";

const heroLinks = [
  {
    title: "Veikals",
    description: "Roku darināti atradumi ikdienai un svētkiem.",
    href: "/veikals/",
  },
  {
    title: "Meistarklases",
    description: "Radošas nodarbības lieliem un maziem.",
    href: "/meistarklases/",
  },
  {
    title: "Ekskursijas",
    description: "Ielūkojies LaLu darbnīcas ikdienā.",
    href: "/ekskursijas/",
  },
  {
    title: "Fantāzijas ziedi",
    description: "Ziedi, kas saglabā savu stāstu ilgāk.",
    href: "/fantazijas-ziedi/",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
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
                Ienāc veikalā
              </a>
              <a className="hero-secondary-cta" href="/ekskursijas/">
                Pieteikties ekskursijai
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="hero-lower-panel" aria-label="Iepazīsti LaLu">
        <div className="hero-panel-intro">
          <span>LaLu radošā darbnīca</span>
          <p>Atklāj stāstus, darbus un piedzīvojumus, kas tapuši tepat Latvijā.</p>
        </div>
        <div className="hero-panel-grid">
          {heroLinks.map((link) => (
            <a className="hero-panel-link" href={link.href} key={link.title}>
              <span className="hero-panel-link-heading">
                <strong>{link.title}</strong>
                <ArrowIcon />
              </span>
              <span>{link.description}</span>
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}
