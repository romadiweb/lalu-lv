"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LaLuMark } from "@/components/brand/lalu-mark";
import { BagIcon } from "@/components/icons/bag-icon";
import { RollingLabel } from "@/components/navigation/rolling-label";
import { navItems, storeCategories } from "@/lib/site-map";

export function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState<"store" | null>(null);
  const [isLogoPopping, setIsLogoPopping] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setActiveMobilePanel(null);
  };

  const openStorePanel = () => {
    setActiveMobilePanel("store");
    setIsLogoPopping(false);
  };

  const closeStorePanel = () => {
    setActiveMobilePanel(null);
    setIsLogoPopping(true);
    window.setTimeout(() => setIsLogoPopping(false), 420);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div
        className={`nav-shell${isMobileOpen ? " mobile-open" : ""}${activeMobilePanel ? " mobile-submenu-open" : ""}${isLogoPopping ? " logo-pop" : ""}`}
      >
        {activeMobilePanel ? (
          <button className="mobile-back-button" type="button" onClick={closeStorePanel}>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M9 3 5 7l4 4" />
            </svg>
            Back
          </button>
        ) : (
          <Link className="brand" href="/" aria-label="LaLu sākums" onClick={closeMobileMenu}>
            <LaLuMark />
            <span>LaLu</span>
          </Link>
        )}

        <nav className="desktop-nav" aria-label="Galvenā navigācija">
          <div className="nav-item nav-item-store">
            <a className="nav-link" href="/veikals/">
              <RollingLabel>Veikals</RollingLabel>
            </a>

            <div className="mega-menu" aria-label="Veikala kategorijas">
              <div className="mega-content">
                <div className="mega-list">
                  <p className="mega-kicker">Veikala kategorijas</p>
                  <div className="category-grid">
                    {storeCategories.map((category) => (
                      <a className="category-link" href={category.href} key={category.name}>
                        <span className={`category-image-frame category-image-frame-${category.tone}`}>
                          <Image
                            src={category.image.src}
                            alt={category.image.alt}
                            width={320}
                            height={320}
                            sizes="44px"
                            loading="eager"
                            decoding="async"
                          />
                        </span>
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

                <a className="mega-feature" href="/veikals/">
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
                <a href="/veikals/">Apskatīt veikalu</a>
                <a href="/kontakti/">Jautāt par pasūtījumu</a>
              </div>
            </div>
          </div>

          {navItems.slice(1).map((item) => (
            <a className="nav-link" href={item.href} key={item.label}>
              <RollingLabel>{item.label}</RollingLabel>
            </a>
          ))}
          <a className="nav-link" href="/kontakti/">
            <RollingLabel>Kontakti</RollingLabel>
          </a>
        </nav>

        <div className="nav-actions">
          <a className="icon-button" href="/veikals/" aria-label="Atvērt veikalu">
            <BagIcon />
          </a>
          <a className="primary-cta" href="/ekskursijas/">
            Pieteikties ekskursijai
          </a>
        </div>

        <div className="mobile-header-actions">
          <a className="mobile-bag-link" href="/veikals/" aria-label="Atvērt veikalu" onClick={closeMobileMenu}>
            <BagIcon />
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={isMobileOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setIsMobileOpen((open) => {
                if (open) {
                  setActiveMobilePanel(null);
                }
                return !open;
              });
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div
          className="mobile-menu-panel"
          id="mobile-navigation"
          aria-hidden={!isMobileOpen}
        >
          <div className="mobile-menu-stage">
            <div className="mobile-menu-root" aria-hidden={activeMobilePanel !== null} inert={activeMobilePanel !== null}>
              <nav className="mobile-menu-links" aria-label="Mobilā navigācija">
                {navItems.map((item) =>
                  item.label === "Veikals" ? (
                    <button type="button" key={item.label} onClick={openStorePanel}>
                      <span>{item.label}</span>
                      <svg viewBox="0 0 14 14" aria-hidden="true">
                        <path d="m5 3 4 4-4 4" />
                      </svg>
                    </button>
                  ) : (
                    <a href={item.href} key={item.label} onClick={closeMobileMenu}>
                      <span>{item.label}</span>
                      <svg viewBox="0 0 14 14" aria-hidden="true">
                        <path d="m5 3 4 4-4 4" />
                      </svg>
                    </a>
                  ),
                )}
                <a href="/kontakti/" onClick={closeMobileMenu}>
                  <span>Kontakti</span>
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="m5 3 4 4-4 4" />
                  </svg>
                </a>
              </nav>

              <div className="mobile-menu-actions">
                <a href="/ekskursijas/" onClick={closeMobileMenu}>
                  Pieteikties ekskursijai
                </a>
                <a href="/veikals/" onClick={closeMobileMenu}>
                  Veikals
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="mobile-submenu-panel" aria-hidden={activeMobilePanel !== "store"} inert={activeMobilePanel !== "store"}>
              <nav className="mobile-category-list" aria-label="Veikala kategorijas">
                <p className="mobile-menu-kicker">Veikala kategorijas</p>
                {storeCategories.map((category) => (
                  <a href={category.href} key={category.name} onClick={closeMobileMenu}>
                    <span className={`category-image-frame category-image-frame-${category.tone}`}>
                      <Image
                        src={category.image.src}
                        alt={category.image.alt}
                        width={320}
                        height={320}
                        sizes="44px"
                        loading="eager"
                        decoding="async"
                      />
                    </span>
                    <span>{category.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
