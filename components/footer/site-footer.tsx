import Link from "next/link";
import { LaLuMark } from "@/components/brand/lalu-mark";
import { footerGroups } from "@/lib/site-map";

export function SiteFooter() {
  return (
    <div className="footer-stage">
      <footer className="site-footer">
        <div className="footer-inner">
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
          <Link className="brand" href="/" aria-label="LaLu sākums">
            <LaLuMark />
            <span>LaLu</span>
          </Link>
          <p style={{ fontWeight: 400 }}>© LaLu. Radošā darbnīca ar neatkārtojamu rokrakstu.</p>
          <div className="footer-socials" aria-label="Sociālie kanāli">
            <a href="/social/facebook/" aria-label="Facebook">
              f
            </a>
            <a href="/social/instagram/" aria-label="Instagram">
              ig
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}