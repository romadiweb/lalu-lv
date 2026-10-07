import type { ReactNode } from "react";
import Link from "next/link";
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
              <strong>LaLu CMS</strong>
              <span>{admin.email}</span>
            </Link>
            <nav className="admin-nav" aria-label="CMS sadaļas">
              {adminResources.map((resource) => (
                <Link href={`/admin/${resource.section}/`} key={resource.section}>
                  {resource.label}
                </Link>
              ))}
            </nav>
            <form action={logoutAction}>
              <button type="submit">Iziet</button>
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
