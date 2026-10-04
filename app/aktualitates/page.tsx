import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/footer/site-footer";
import { ArchiveList } from "@/components/updates/archive-list";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Aktualitātes | LaLu",
  description: "LaLu darbnīcas jaunumi, notikumi un radošie stāsti.",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export default function AktualitatesPage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <div className={styles.archiveLayout}>
        <ArchiveList />

        <aside className={styles.sidebar} aria-label="LaLu saites">
          <h2>LaLu</h2>
          <nav>
            <Link href="/kontakti/">
              Pieteikt ciemošanos
              <ArrowIcon />
            </Link>
            <Link href="/veikals/">
              Apskatīt veikalu
              <ArrowIcon />
            </Link>
            <a
              href="https://www.facebook.com/laludarbnica/?locale=lv_LV"
              rel="noreferrer"
              target="_blank"
            >
              Jaunumi Facebook
              <ArrowIcon />
            </a>
          </nav>
        </aside>
      </div>

      <SiteFooter />
    </main>
  );
}
