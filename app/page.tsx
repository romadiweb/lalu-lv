import { SiteFooter } from "@/components/footer/site-footer";
import { AboutLalu } from "@/components/home/about-lalu";
import { FaqSection } from "@/components/home/faq-section";
import { LatestPosts } from "@/components/home/latest-posts";
import { OpeningPanel } from "@/components/home/opening-panel";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { StoryCarousel } from "@/components/home/story-carousel";
import { VisitCta } from "@/components/home/visit-cta";
import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <OpeningPanel />
      <LatestPosts />
      <VisitCta />
      <AboutLalu />
      <StoryCarousel />
      <FaqSection />
      <PreFooterCta />
      <SiteFooter />
    </main>
  );
}
