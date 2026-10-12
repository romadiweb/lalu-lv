import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="payment-status-page">
      <section>
        <p>Apmaksa</p>
        <h1>Paldies, maksājums ir pieņemts.</h1>
        <p>
          Paysera apstiprinājumu apstrādājam servera pusē. Ja apmaksa jau ir
          apstiprināta, pasūtījums tiks sagatavots tālākai apstrādei.
        </p>
        <Link href="/veikals/">Atgriezties veikalā</Link>
      </section>
    </main>
  );
}
