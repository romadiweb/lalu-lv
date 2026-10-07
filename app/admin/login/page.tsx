import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { loginAction } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin/");
  }

  const { error } = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <h1 id="admin-login-title">LaLu Vadības Sistēma</h1>
        <p>Lūdzu, ievadiet savus autentifikācijas datus.</p>
        <form action={loginAction}>
          {error ? <div className="admin-error">Nepareizs e-pasts vai parole.</div> : null}
          <div className="admin-field">
            <label htmlFor="email">E-pasts</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Parole</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button className="admin-button" type="submit">Ienākt</button>
        </form>
      </section>
    </main>
  );
}
