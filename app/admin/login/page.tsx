import { redirect } from "next/navigation";
import { LaLuMark } from "@/components/brand/lalu-mark";
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
  const errorMessage = error === "service"
    ? "Neizdevās savienoties ar autentifikācijas pakalpojumu. Lūdzu, mēģiniet vēlreiz pēc brīža."
    : error
      ? "Nepareizs e-pasts vai parole. Lūdzu, mēģiniet vēlreiz."
      : null;

  return (
    <main className="admin-login">
      <div className="admin-login-orb admin-login-orb-one" aria-hidden="true" />
      <div className="admin-login-orb admin-login-orb-two" aria-hidden="true" />
      <div className="admin-login-orb admin-login-orb-three" aria-hidden="true" />

      <div className="admin-login-grid" aria-hidden="true" />
      <div className="admin-login-noise" aria-hidden="true" />

      <section
        className="admin-login-card"
        aria-labelledby="admin-login-title"
      >
        <div className="admin-login-card-glow" aria-hidden="true" />

        <div className="admin-login-brand">
          <div className="admin-login-brand-mark">
            <LaLuMark />
          </div>

          <div>
            <span>LaLu</span>
            <small>Vadības sistēma</small>
          </div>
        </div>

        <div className="admin-login-heading">

          <h1 id="admin-login-title">
            Laipni lūdzam
            <span> atpakaļ.</span>
          </h1>

          <p>
            Ievadiet savus administratora piekļuves datus, lai
            turpinātu darbu LaLu vadības sistēmā.
          </p>
        </div>

        <form action={loginAction} className="admin-login-form">
          {errorMessage ? (
            <div className="admin-error" role="alert">
              <span className="admin-error-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="7.5" />
                  <path d="M10 6.4v4.4" />
                  <path d="M10 13.8h.01" />
                </svg>
              </span>

              <span>{errorMessage}</span>
            </div>
          ) : null}

          <div className="admin-login-field">
            <label htmlFor="email">E-pasts</label>

            <div className="admin-login-input">
              <span className="admin-login-input-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <rect x="2.5" y="4" width="15" height="12" rx="2.5" />
                  <path d="m4 6 6 4.5L16 6" />
                </svg>
              </span>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@lalu.lv"
                required
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Parole</label>

            <div className="admin-login-input">
              <span className="admin-login-input-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <rect x="3.5" y="8" width="13" height="9" rx="2.5" />
                  <path d="M6.5 8V6.3a3.5 3.5 0 0 1 7 0V8" />
                  <path d="M10 11.2v2.4" />
                </svg>
              </span>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button className="admin-login-submit" type="submit">
            <span>Ienākt vadības sistēmā</span>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11" />
              <path d="m11 6 4 4-4 4" />
            </svg>
          </button>
        </form>

        <div className="admin-login-footer">
          <div className="admin-login-security">
            <span className="admin-login-security-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <path d="M10 2.5 16 5v4.8c0 3.6-2.4 6.2-6 7.7-3.6-1.5-6-4.1-6-7.7V5l6-2.5Z" />
                <path d="m7.3 9.8 1.7 1.7 3.7-3.8" />
              </svg>
            </span>

            <span>Droša administratora piekļuve</span>
          </div>

          <span className="admin-login-version">
            LaLu Admin
          </span>
        </div>
      </section>
    </main>
  );
}
