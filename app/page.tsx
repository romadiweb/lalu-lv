const storeCategories = [
  {
    name: "Peles",
    href: "https://www.lalu.lv/veikals/category/peles/",
    tone: "lavender",
    description: "Roku darinātas peles ar raksturu.",
  },
  {
    name: "Rotaļlietas",
    href: "https://www.lalu.lv/veikals/category/rotallietas/",
    tone: "cream",
    description: "Mīksti, koši un bērniem draudzīgi darbi.",
    nested: true,
  },
  {
    name: "Cepures",
    href: "https://www.lalu.lv/veikals/category/cepures/",
    tone: "warm",
    description: "Siltas sezonas izvēles katrai dienai.",
  },
  {
    name: "Cimdi",
    href: "https://www.lalu.lv/veikals/category/cimdi/",
    tone: "lavender",
    description: "Adīti pāri ar amatnieces rokrakstu.",
    nested: true,
  },
  {
    name: "Mauči jeb dūrgaļi",
    href: "https://www.lalu.lv/veikals/category/mauci-jeb-durgali/",
    tone: "cream",
    description: "Praktiski un dekoratīvi plaukstu sildītāji.",
  },
  {
    name: "Latviski darbi / Atstarotāji",
    href: "https://www.lalu.lv/veikals/category/atstarotaji/",
    tone: "warm",
    description: "Gaismai, drošībai un latviskai noskaņai.",
  },
  {
    name: "Dažādi",
    href: "https://www.lalu.lv/veikals/category/atslegu-piekarini/",
    tone: "lavender",
    description: "Nelieli atradumi un dāvanu nieki.",
    nested: true,
  },
  {
    name: "Magnētiņi",
    href: "https://www.lalu.lv/veikals/category/magnetini/",
    tone: "cream",
    description: "Mazie piemiņas darbi ikdienai.",
  },
  {
    name: "Pasūtījumi",
    href: "https://www.lalu.lv/veikals/category/pasutijumi/",
    tone: "warm",
    description: "Individuāli darinājumi pēc vienošanās.",
  },
  {
    name: "Fantāzijas ziedi",
    href: "https://www.lalu.lv/veikals/category/fantazijas-ziedi/",
    tone: "lavender",
    description: "Ziedi, kuri paliek ilgāk par sezonu.",
  },
];

const navItems = [
  { label: "Veikals", href: "https://www.lalu.lv/veikals/" },
  { label: "Meistarklases", href: "https://www.lalu.lv/meistarklases/" },
  { label: "Ekskursijas", href: "https://www.lalu.lv/ekskursijas/" },
  { label: "Fantāzijas ziedi", href: "https://www.lalu.lv/fantazijas-ziedi/" },
  { label: "Par mums", href: "https://www.lalu.lv/par-lalu/" },
];

const footerGroups = [
  {
    title: "LaLu",
    links: [
      { label: "Par LaLu", href: "https://www.lalu.lv/par-lalu/" },
      { label: "Vectēva stāsts", href: "https://www.lalu.lv/vecteva-stasts/" },
      { label: "Pagalma piedzīvojumi", href: "https://www.lalu.lv/ekskursijas/" },
    ],
  },
  {
    title: "Veikals",
    links: storeCategories.slice(0, 5).map(({ name, href }) => ({ label: name, href })),
  },
  {
    title: "Notikumi",
    links: [
      { label: "Meistarklases", href: "https://www.lalu.lv/meistarklases/" },
      { label: "Ekskursijas", href: "https://www.lalu.lv/ekskursijas/" },
      { label: "Pieteikties ciemos", href: "https://www.lalu.lv/kontakti/" },
    ],
  },
];

function LaLuMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" role="img">
        <path d="M7 24c0-9 5.5-16 13-16 5.2 0 9 3.6 9 8.6 0 7.3-7.2 11.4-16.9 11.4H7v-4Z" />
        <path d="M12 23.8c.6-5.2 3.8-9.6 8-9.6 2.9 0 5 2 5 4.8 0 3.7-3.9 6.5-9.4 6.5H12v-1.7Z" />
        <circle cx="23.5" cy="16.5" r="2.4" />
      </svg>
    </span>
  );
}

function BagIcon() {
  return (
    <svg className="bag-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 8.6h9.6l.8 10.2a2 2 0 0 1-2 2.2H8.4a2 2 0 0 1-2-2.2l.8-10.2Z" />
      <path d="M9.2 8.6V7.1a2.8 2.8 0 0 1 5.6 0v1.5" />
    </svg>
  );
}

function CategoryIcon({ tone }: { tone: string }) {
  return (
    <span className={`category-icon category-icon-${tone}`} aria-hidden="true">
      <svg viewBox="0 0 28 28">
        <path className="icon-thread" d="M7 17.6c4-6.2 8.8-8.6 14.2-7.4" />
        <path className="icon-thread icon-thread-alt" d="M6.8 10.8c3.4 1 6.8 3.9 10.2 8.6" />
        <circle cx="9" cy="18.8" r="2.8" />
        <circle cx="19.2" cy="9.4" r="2.6" />
      </svg>
    </span>
  );
}

function RollingLabel({ children }: { children: string }) {
  return (
    <span className="rolling-label">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="https://www.lalu.lv/" aria-label="LaLu sākums">
          <LaLuMark />
          <span>LaLu</span>
        </a>

        <nav className="desktop-nav" aria-label="Galvenā navigācija">
          <div className="nav-item nav-item-store">
            <a className="nav-link" href="https://www.lalu.lv/veikals/">
              <RollingLabel>Veikals</RollingLabel>
            </a>

            <div className="mega-menu" aria-label="Veikala kategorijas">
              <div className="mega-content">
                <div className="mega-list">
                  <p className="mega-kicker">Veikala kategorijas</p>
                  <div className="category-grid">
                    {storeCategories.map((category) => (
                      <a className="category-link" href={category.href} key={category.name}>
                        <CategoryIcon tone={category.tone} />
                        <span>
                          <span className="category-title">
                            {category.name}
                            {category.nested ? (
                              <svg className="chevron" viewBox="0 0 14 14" aria-hidden="true">
                                <path d="m5 3 4 4-4 4" />
                              </svg>
                            ) : null}
                          </span>
                          <span className="category-description">{category.description}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <a className="mega-feature" href="https://www.lalu.lv/veikals/">
                  <span className="feature-art" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="feature-label">Radošā darbnīca LaLu</span>
                  <strong>Ienāc veikalā un atrodi rokām darinātu dāvanu.</strong>
                </a>
              </div>

              <div className="mega-actions">
                <a href="https://www.lalu.lv/veikals/">Apskatīt veikalu</a>
                <a href="https://www.lalu.lv/kontakti/">Jautāt par pasūtījumu</a>
              </div>
            </div>
          </div>

          {navItems.slice(1).map((item) => (
            <a className="nav-link" href={item.href} key={item.label}>
              <RollingLabel>{item.label}</RollingLabel>
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="icon-button" href="https://www.lalu.lv/veikals/" aria-label="Atvērt veikalu">
            <BagIcon />
          </a>
          <a className="primary-cta" href="https://www.lalu.lv/ekskursijas/">
            Pieteikties ekskursijai
          </a>
        </div>

        <details className="mobile-menu">
          <summary>Izvēlne</summary>
          <div>
            {navItems.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
            <a href="https://www.lalu.lv/kontakti/">Kontakti</a>
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="brand" href="https://www.lalu.lv/" aria-label="LaLu sākums">
            <LaLuMark />
            <span>LaLu</span>
          </a>
          <p>
            Radīts Latvijā. Radīts ar mīlestību. Rokdarbi, radošas darbnīcas un
            ciemošanās Aizputē.
          </p>
        </div>

        <div className="footer-links">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-contact">
          <h2>Kontakti</h2>
          <p>Laila Luzere</p>
          <p>Cepļa iela 4 - 9, Aizpute, Dienvidkurzemes novads, LV-3456</p>
          <a href="mailto:laila@lalu.lv">laila@lalu.lv</a>
          <a href="tel:+37126878579">+371 26878579</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© LaLu. Radošā darbnīca ar neatkārtojamu rokrakstu.</p>
        <a href="https://www.facebook.com/laludarbnica">Facebook</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="page-shell">
      <Header />

      <section className="opening-panel" aria-label="LaLu sākuma struktūra">
        <div>
          <h1>Radīts Latvijā. Radīts ar mīlestību.</h1>
          <p>
            Sākam pārbūvi ar mierīgu navigācijas un kājenes pamatu. Pārējās
            lapas pievienosim vēlāk, saglabājot LaLu roku darbu siltumu un
            Clay iedvesmotu kustību.
          </p>
        </div>
        <a className="secondary-cta" href="https://www.lalu.lv/veikals/">
          Ienāc veikalā
        </a>
      </section>

      <Footer />
    </main>
  );
}
