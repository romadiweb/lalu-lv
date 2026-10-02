"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LaLuMark } from "@/components/brand/lalu-mark";
import { BagIcon } from "@/components/icons/bag-icon";
import { CategoryIcon } from "@/components/icons/category-icon";
import { RollingLabel } from "@/components/navigation/rolling-label";
import { navItems, storeCategories } from "@/lib/site-map";

export function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

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
      <div className={`nav-shell${isMobileOpen ? " mobile-open" : ""}`}>
        <Link className="brand" href="/" aria-label="LaLu sākums">
          <LaLuMark />
          <span>LaLu</span>
        </Link>

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
            onClick={() => setIsMobileOpen((open) => !open)}
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
          <nav className="mobile-menu-links" aria-label="Mobilā navigācija">
            {navItems.map((item) => (
              <a href={item.href} key={item.label} onClick={closeMobileMenu}>
                <span>{item.label}</span>
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="m5 3 4 4-4 4" />
                </svg>
              </a>
            ))}
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
      </div>
    </header>
  );
}
