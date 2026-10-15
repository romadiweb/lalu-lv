import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminRecordsTable } from "../admin-records-table";
import { SaveToast } from "../save-toast";
import { requireAdmin } from "@/lib/admin/auth";
import { formatListValue, getProductListCategories, listRecords } from "@/lib/admin/cms";
import { getAdminResource } from "@/lib/admin/resources";

export default async function AdminSectionPage({ params, searchParams }: PageProps<"/admin/[section]">) {
  await requireAdmin();
  const { section } = await params;
  const { saved, deleted } = await searchParams;
  const resource = getAdminResource(section);

  if (!resource) {
    notFound();
  }

  const [records, categories] = await Promise.all([
    listRecords(resource),
    resource.section === "veikala-produkti" ? getProductListCategories() : Promise.resolve([]),
  ]);
  const serializedRecords = records.map((record) => ({
    id: String(record.id),
    imageUrl: typeof record.image_url === "string" ? record.image_url : "",
    categoryIds: Array.isArray(record.category_ids) ? record.category_ids.map(String) : [],
    copyText: typeof record.copy_text === "string" ? record.copy_text : "",
    ...Object.fromEntries(
      resource.listColumns.map((column) => [
        column,
        formatListValue(column, record[column]),
      ]),
    ),
  }));

  return (
    <main>
      {saved ? <SaveToast type={saved === "created" ? "created" : "updated"} /> : null}
      {deleted === "1" ? <SaveToast type="deleted" /> : null}
      <header className="admin-header">
        <div>
          <h1>{resource.label}</h1>
          <p>{resource.description}</p>
        </div>
        <Link className="admin-button" href={`/admin/${resource.section}/new/`}>
          Pievienot
        </Link>
      </header>

      <AdminRecordsTable
        section={resource.section}
        columns={resource.listColumns}
        records={serializedRecords}
        categories={categories}
      />
    </main>
  );
}
