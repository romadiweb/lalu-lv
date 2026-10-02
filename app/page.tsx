import { SiteFooter } from "@/components/footer/site-footer";
import { OpeningPanel } from "@/components/home/opening-panel";
import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <OpeningPanel />
      <SiteFooter />
    </main>
  );
}
