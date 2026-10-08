import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privātuma un sīkdatņu politika | LaLu",
  description:
    "LaLu privātuma un sīkdatņu politika par personas datu apstrādi, sīkdatnēm un datu subjekta tiesībām.",
};

export default function SikdatnuPolitikaPage() {
  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <section className={styles.policyIntro} aria-labelledby="policy-title">
        <h1 id="policy-title">Privātuma politika</h1>
        <p>
          Šī privātuma politika informē par personas datu apstrādes principiem
          saistībā ar Lailas Luzeres mājaslapu un pakalpojumiem. Jautājumiem par
          datu apstrādi, lūdzu, rakstiet uz e-pastu{" "}
          <a href="mailto:lailalu@inbox.lv">lailalu@inbox.lv</a>.
        </p>
      </section>

      <article className={styles.policyContent}>
        <section>
          <h2>Kādu informāciju es iegūstu?</h2>
          <p>
            Es iegūstu tādus personas datus, ko jūs man brīvprātīgi sniedzat ar
            e-pasta starpniecību, aizpildot tīmeklī bāzētas anketas vai citā
            tiešā saziņā. Iesniedzot pasūtījumu, jums jānorāda vārds, uzvārds,
            kontaktinformācija, piegādes adrese un cita informācija, kuru
            vēlaties sniegt.
          </p>
        </section>

        <section>
          <h2>Kā es izmantoju iegūtos personas datus?</h2>
          <p>Es varu izmantot iegūtos personas datus, lai:</p>
          <ul>
            <li>sniegtu jums pieprasītos pakalpojumus un informāciju,</li>
            <li>apstrādātu pasūtījumus un noformētu nepieciešamos dokumentus,</li>
            <li>sniegtu efektīvu klientu atbalstu,</li>
            <li>palīdzētu novērst apdraudējumu vai krāpnieciskas darbības,</li>
            <li>
              nosūtītu informatīvus ziņojumus, ja esat nepārprotami piekrituši
              tādus saņemt,
            </li>
            <li>ievērotu normatīvo aktu prasības.</li>
          </ul>
          <p>
            Es varu nodot jūsu informāciju trešajām personām, lai ievērotu
            normatīvo aktu prasības, sadarbotos ar uzraudzības iestādēm,
            palīdzētu novērst noziedzīgas darbības un aizsargātu manas, jūsu un
            citu personu likumīgās tiesības.
          </p>
        </section>

        <section>
          <h2>Kā es aizsargāju personas datus?</h2>
          <p>
            Jūsu personas datu aizsardzībai es izmantoju tehniskus un
            organizatoriskus drošības pasākumus. Jūsu personas dati ir pieejami
            ierobežotam cilvēku skaitam, tikai pilnvarotām personām.
          </p>
        </section>

        <section>
          <h2>Cik ilgi es glabāju personas datus?</h2>
          <p>
            Es glabāju jūsu personas datus tik ilgi, cik tie ir nepieciešami
            atbilstoši to ieguves mērķim un kā to pieļauj vai nosaka normatīvo
            aktu prasības.
          </p>
        </section>

        <section>
          <h2>Kā es izmantoju sīkdatnes?</h2>
          <p>
            Sīkdatnes ir nelielas teksta datnes, ko jūsu apmeklētās mājaslapas
            saglabā jūsu datorā. Tās tiek izmantotas, lai nodrošinātu mājaslapas
            darbību, kā arī lai sniegtu informāciju vietnes īpašniekam.
          </p>
          <p>Šī mājaslapa var iestatīt šādas sīkdatnes:</p>
          <ul>
            <li>
              <strong>Funkcionālās sīkdatnes.</strong> Šīs sīkdatnes ir
              nepieciešamas, lai jūs spētu pārvietoties mājaslapā un lietot tās
              funkcijas. Bez šīm sīkdatnēm es nevaru nodrošināt pieprasītos
              pakalpojumus, piemēram, preču groza funkcionalitāti.
            </li>
            <li>
              <strong>Google Analytics sīkdatnes.</strong> Šīs sīkdatnes lieto,
              lai iegūtu mājaslapas apmeklējuma statistiku. Šī informācija tiek
              izmantota vietnes darbības un reklāmas pasākumu uzlabošanai.
            </li>
            <li>
              <strong>Mērķētas reklāmas rīku sīkdatnes.</strong> Šīs sīkdatnes
              lieto, lai paaugstinātu reklāmas efektivitāti un rādītu reklāmas,
              kas, visticamāk, jūs interesēs visvairāk.
            </li>
            <li>
              <strong>Trešās puses pakalpojumu sniedzēja sīkdatnes.</strong>{" "}
              Sīkdatnes var iestatīt šajā mājaslapā lietotie trešo pušu
              pakalpojumi, piemēram, Facebook poga “Patīk” vai YouTube video.
              Dažas no šīm sīkdatnēm var tikt izmantotas, lai sekotu līdzi jūsu
              darbībām citās mājaslapās, un es tās nevaru kontrolēt, jo šīs
              sīkdatnes nav iestatījusi mana mājaslapa.
            </li>
          </ul>
        </section>

        <section>
          <h2>Kā atteikties no sīkdatnēm?</h2>
          <p>
            Lai atteiktos no sīkdatņu saņemšanas, varat izmantot privātās
            pārlūkošanas režīmu, kuru nodrošina lielākā daļa pārlūkprogrammu
            (privāts logs, inkognito logs vai <em>InPrivate</em> logs).
            Sīkdatnes, kas tiek izveidotas privātās pārlūkošanas režīmā, tiek
            dzēstas, tiklīdz aizverat visus pārlūka logus.
          </p>
          <p>
            Lai atteiktos no mērķētas reklāmas rādīšanai nepieciešamās
            informācijas iegūšanas un lietošanas, varat izmantot bezmaksas rīku{" "}
            <a href="https://www.youronlinechoices.com/">Your Online Choices</a>{" "}
            vai <a href="http://www.aboutads.info/">YourAdChoices</a>.
          </p>
        </section>

        <section>
          <h2>Jūsu tiesības saistībā ar personas datiem</h2>
          <p>
            Ja esat datu subjekts saskaņā ar{" "}
            <a href="https://ec.europa.eu/info/law/law-topic/data-protection_lv">
              ES VDAR
            </a>
            , jums ir turpmāk minētās tiesības saistībā ar saviem personas
            datiem:
          </p>
          <ul>
            <li>
              <strong>Tiesības piekļūt informācijai.</strong> Jums ir tiesības
              saņemt informāciju par to, kāpēc un kā tiek apstrādāti jūsu
              personas dati, kā arī bez maksas saņemt mūsu rīcībā esošo personas
              datu kopiju plaši izmantotā elektroniskā formātā.
            </li>
            <li>
              <strong>Tiesības labot.</strong> Jums ir tiesības panākt
              neprecīzu vai nepilnīgu personas datu labošanu vai papildināšanu
              bez nepamatotas kavēšanās.
            </li>
            <li>
              <strong>Tiesības “tikt aizmirstam”.</strong> Jums ir tiesības
              atsaukt savu piekrišanu personas datu apstrādei un panākt savu
              personas datu dzēšanu bez nepamatotas kavēšanās, tiklīdz dati vairs
              nav nepieciešami, lai sniegtu pieprasītos pakalpojumus vai ievērotu
              normatīvo aktu prasības.
            </li>
            <li>
              <strong>Tiesības ierobežot apstrādi.</strong> Jums ir tiesības
              panākt personas datu apstrādes ierobežošanu, ja iebilstat pret to
              un man nav leģitīmu pamatu turpināt apstrādi, ja apstrīdat datu
              precizitāti, ja apstrāde ir pretlikumīga vai ja pieprasāt celt,
              īstenot vai aizstāvēt likumīgas prasības.
            </li>
            <li>
              <strong>Tiesības iebilst.</strong> Jums ir tiesības jebkurā brīdī
              iebilst pret datu apstrādi, ja vien tā nav nepieciešama sabiedrības
              interesēs veicamam uzdevumam vai apstrādei nepastāv neapstrīdams
              likumīgs pamats.
            </li>
            <li>
              <strong>Citas tiesības saskaņā ar VDAR.</strong> Vairāk
              informācijas skatiet{" "}
              <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-citizens_lv">
                ES datu aizsardzībai veltītajā mājaslapā
              </a>
              .
            </li>
          </ul>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
