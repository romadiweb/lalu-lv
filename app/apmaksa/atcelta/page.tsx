import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <main className="payment-status-page">
      <section>
        <p>Apmaksa</p>
        <h1>Maksājums netika pabeigts.</h1>
        <p>Apmaksu vari sākt vēlreiz, atgriežoties veikalā un izvēloties preces.</p>
        <Link href="/veikals/">Atgriezties veikalā</Link>
      </section>
    </main>
  );
}
