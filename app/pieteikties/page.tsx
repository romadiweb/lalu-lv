import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getPublishedWorkshopOptions } from "@/lib/content";
import { PieteiktiesForm } from "./pieteikties-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pieteikties | LaLu",
  description:
    "Piesaki ekskursiju, ciemošanos, meistarklasi vai īpašu notikumu LaLu radošajā darbnīcā Aizputē.",
};

export default async function PieteiktiesPage() {
  const workshopOptions = await getPublishedWorkshopOptions();

  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.section} aria-labelledby="signup-title">
        <div className={styles.copy}>
          <h1 id="signup-title">Sarunāsim jūsu LaLu apmeklējumu.</h1>
          <p>
            Pastāsti, vai plāno ekskursiju, meistarklasi vai īpašu notikumu.
            Mēs palīdzēsim piemeklēt piemērotu programmu, laiku un ritmu jūsu
            grupai.
          </p>
        </div>

        <PieteiktiesForm workshopOptions={workshopOptions} />
      </section>

      <SiteFooter />
    </main>
  );
}
