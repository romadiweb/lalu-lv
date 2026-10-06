import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";

export const metadata: Metadata = {
  title: "Piegāde | LaLu",
  description: "Informācija par LaLu pasūtījumu piegādi.",
};

export default function PiegadePage() {
  return (
    <main>
      <SiteHeader />
      <SiteFooter />
    </main>
  );
}
