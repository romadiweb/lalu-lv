import type { ReactNode } from "react";
import Link from "next/link";
import { LaLuMark } from "@/components/brand/lalu-mark";
import { adminResources } from "@/lib/admin/resources";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { logoutAction } from "./actions";
import "./admin.css";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  return (
    <div className="admin-page">
      {admin ? (
        <div className="admin-shell">
          <aside className="admin-sidebar">
            <Link className="admin-brand" href="/admin/">
              <span className="admin-brand-logo">
                <LaLuMark />
                <strong>LaLu</strong>
              </span>
              <span className="admin-brand-email">{admin.email}</span>
            </Link>
            <nav className="admin-nav" aria-label="CMS sadaļas">
              {adminResources.map((resource) => (
                <Link href={`/admin/${resource.section}/`} key={resource.section}>
                  {resource.label}
                </Link>
              ))}
            </nav>
            <form action={logoutAction}>
              <button className="admin-logout-button" type="submit">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M8.25 4.25H5.75C4.78 4.25 4 5.03 4 6v8c0 .97.78 1.75 1.75 1.75h2.5" />
                  <path d="M9 10h7" />
                  <path d="m13.5 7.5 2.5 2.5-2.5 2.5" />
                </svg>
                Iziet
              </button>
            </form>
          </aside>
          <div className="admin-content">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
