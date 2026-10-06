"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export function TermsOverlay() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={styles.termsTrigger}
        type="button"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        <span>Lasīt distances līgumu</span>
        <span className={styles.arrowRoll} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M3 8h10m-4-4 4 4-4 4" />
          </svg>
          <svg viewBox="0 0 16 16">
            <path d="M3 8h10m-4-4 4 4-4 4" />
          </svg>
        </span>
      </button>

      <dialog
        className={styles.termsDialog}
        ref={dialogRef}
        aria-labelledby="distance-agreement-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
      >
        <div className={styles.termsPanel}>
          <header className={styles.termsDialogHeader}>
            <h2 id="distance-agreement-title">Distances līgums</h2>
            <button type="button" aria-label="Aizvērt distances līgumu" onClick={closeDialog}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 4 8 8M12 4l-8 8" />
              </svg>
            </button>
          </header>

          <div className={styles.termsContent}>
            <p>
              Šajā Interneta veikalā LaLu piedāvāto preču pārdevējs Laila Luzere
              no vienas puses, turpmāk saukts Pārdevējs, un persona, kas veic
              pasūtījumu, turpmāk saukta Pircējs, no otras puses, noslēdz šādu
              Līgumu:
            </p>
            <p>
              Pārdevējs apņemas pārdot un piegādāt Pircējam preces, atbilstoši
              Pircēja pasūtījumam.
            </p>

            <h3>Piegādes un samaksas kārtība</h3>
            <p>
              Pircējs veic preču pasūtīšanu caur šo mājas lapu, norādot pasūtāmo
              preču veidu un daudzumu. Pircējam ir iespēja veikt apmaksu par preci
              lietojot Interneta veiklā iestrādātos maksājuma rīkus vai apmaksājot
              pārdevēja sagatavoto un Pircējam pa e-pastu nosūtīto pasūtījumam
              atbilstošo rēķinu. Rēķins tiek sagatavots elektroniski un ir derīgs
              bez paraksta.
            </p>
            <p>
              Pārdevējs nodrošina preču izsūtīšanu 7 dienu laikā kopš ir saņemta
              apmaksa par preci.
            </p>

            <h3>Atteikuma tiesības</h3>
            <p>
              Pircējam ir tiesības atteikties no preces 14 kalendāro dienu laikā
              no Preces saņemšanas brīža, nosūtot Pārdevējam par to atteikuma
              vēstuli. Atteikuma vēstules veidlapu Pārdevējs nosūta Pircējam pa
              e-pastu pēc Pircēja pieprasījuma.
            </p>
            <p>
              Pircēja pienākums ir 7 dienu laikā pēc atteikuma vēstules nosūtīšanas
              atdot preci Pārdevējam. Visus izdevumus, kas radīsies saistībā ar
              preces nosūtīšanu atpakaļ Pārdevējam, sedz Pircējs.
            </p>
            <p>Pircējs nevar izmantot atteikuma tiesības, ja:</p>
            <ul>
              <li>
                Latvijas Republikas Patērētāju tiesību aizsardzības likuma 12.
                panta sestā daļa nosaka, ka “patērētājs ir atbildīgs par preces
                kvalitātes un drošuma saglabāšanu atteikuma tiesību realizēšanas
                termiņā”.
              </li>
              <li>
                Pārdevējs patur tiesības Pircējam atteikt izmantot atteikuma
                tiesības vai ieturēt kompensācijas maksu gadījumā, ja prece ir
                bojāta, lietošanas laikā nevērīgi izturoties pret preci vai
                neievērojot instrukcijas norādījumus, ja ir nozaudēts preces
                oriģinālais iepakojums vai ja tās iepakojums ir būtiski bojāts.
              </li>
              <li>
                Pasūtītās preces pēc to rakstura nevar atdot atpakaļ – ir redzamas
                lietošanas pazīmes vai arī prece ir bojāta.
              </li>
              <li>
                Pasūtītās preces ir izgatavotas tieši Pircējam pēc individuāla
                pasūtījuma.
              </li>
              <li>
                Pasūtīta dalība meistarklasē, kurai noteikts norises datums un
                laiks.
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
