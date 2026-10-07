import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteRecordForm } from "../delete-record-form";
import { SaveToast } from "../save-toast";
import { requireAdmin } from "@/lib/admin/auth";
import { formatListValue, listRecords } from "@/lib/admin/cms";
import { getAdminResource } from "@/lib/admin/resources";

export default async function AdminSectionPage({ params, searchParams }: PageProps<"/admin/[section]">) {
  await requireAdmin();
  const { section } = await params;
  const { saved } = await searchParams;
  const resource = getAdminResource(section);

  if (!resource) {
    notFound();
  }

  const records = await listRecords(resource);

  return (
    <main>
      {saved === "1" ? <SaveToast /> : null}
      <header className="admin-header">
        <div>
          <h1>{resource.label}</h1>
          <p>{resource.description}</p>
        </div>
        <Link className="admin-button" href={`/admin/${resource.section}/new/`}>
          Pievienot
        </Link>
      </header>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              {resource.listColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th>Darbība</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={String(record.id)}>
                <td>{String(record.id)}</td>
                {resource.listColumns.map((column) => (
                  <td key={column}>{formatListValue(column, record[column])}</td>
                ))}
                <td className="admin-table-actions">
                  <Link
                    className="admin-edit-button"
                    href={`/admin/${resource.section}/${record.id}/`}
                  >
                    Labot
                  </Link>
                  <DeleteRecordForm
                    section={resource.section}
                    id={String(record.id)}
                    compact
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
