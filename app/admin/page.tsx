import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminResources } from "@/lib/admin/resources";
import { ResourceIcon } from "./resource-icon";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <main>
      <header className="admin-header">
        <div>
          <h1>CMS panelis</h1>
          <p>Izvēlies sadaļu kreisajā pusē vai zemāk. Katra sadaļa ir vienkārša tabula ar ierakstu labošanu.</p>
        </div>
      </header>
      <section className="admin-cards" aria-label="CMS sadaļas">
        {adminResources.map((resource) => (
          <Link className="admin-card" href={`/admin/${resource.section}/`} key={resource.section}>
            <div>
              <h2><ResourceIcon icon={resource.icon} />{resource.label}</h2>
              <p>{resource.description}</p>
            </div>
            <span>Atvērt sadaļu</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
