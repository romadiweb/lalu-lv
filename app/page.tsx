import { SiteFooter } from "@/components/footer/site-footer";
import { OpeningPanel } from "@/components/home/opening-panel";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <OpeningPanel />
      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
