import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { TermsOverlay } from "./terms-overlay";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Piegāde | LaLu",
  description: "Informācija par LaLu pasūtījumu piegādi.",
};

export default function PiegadePage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />
      <section className={styles.deliveryIntro} aria-labelledby="delivery-title">
        <h1 id="delivery-title">
          Par piegādi uz valstīm, kas nav minētas sarakstā, lūdzu, pirms
          pasūtīšanas, sazinies ar mani.
        </h1>
        <p>
          Preces saņemšanas vai piegādes veidu pircējs izvēlās veicot pasūtījumu
          un apmaksājot to. Lielākā daļa preču ir uz vietas gatavas un mēs
          cenšamies tās sūtīt pēc apmaksas veikšanas apstiprinājuma saņemšanas
          1 - 3 dienu laikā. Parasti, Latvijas robežās, paciņa tiek piegādāta
          1 - 3 pēc izsūtīšanas. Saņemsi telefonā īsziņu, ka paka piegādāta Tavā
          norādītajā saņemšanas pakomātā.
        </p>

        <div className={styles.deliveryGrid} aria-label="Piegādes iespējas">
          <article className={styles.deliveryCard}>
            <div className={styles.carrierMark}>
              <Image
                src="/images/third-party-logos/Omniva_lockup_horizontal_orange.svg"
                alt=""
                width={84}
                height={28}
                sizes="84px"
              />
            </div>
            <h2>Omniva Latvija</h2>
            <strong>3,09 €</strong>
          </article>

          <article className={styles.deliveryCard}>
            <div className={styles.carrierMark}>
              <Image
                src="/images/third-party-logos/DPD_logo_(2015).svg"
                alt=""
                width={58}
                height={30}
                sizes="58px"
              />
            </div>
            <h2>DPD paku bode</h2>
            <strong>3,25 €</strong>
          </article>

          <article className={styles.deliveryCard}>
            <div className={styles.carrierMark}>
              <Image
                src="/images/third-party-logos/Latvijas_Pasts_(2025).svg"
                alt=""
                width={70}
                height={30}
                sizes="70px"
              />
            </div>
            <h2>Latvijas Pasts</h2>
            <strong>6,00 €</strong>
          </article>

          <article className={styles.deliveryCard}>
            <span className={styles.pickupMark} aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M16 28s8-7.3 8-15a8 8 0 1 0-16 0c0 7.7 8 15 8 15Z" />
                <circle cx="16" cy="13" r="3" />
              </svg>
            </span>
            <h2>Vēlos saņemt personīgi darbnīcā Aizputē</h2>
            <strong>0 €</strong>
          </article>
        </div>

        <section className={styles.termsSection} aria-labelledby="terms-title">
          <h2 id="terms-title">Noteikumi</h2>
          <p>
            Latvijas republikas likumdošana nosaka, ka interneta veikala
            īpašniekam ir jāatrunā preču piegādes un atgriešanas noteikumi, kā arī
            atteikuma tiesības. Šādu atrunu sauc par distances līgumu ({" "}
            <a href="http://likumi.lv/doc.php?id=266462">MK noteikumi</a>).
          </p>
          <TermsOverlay />
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
