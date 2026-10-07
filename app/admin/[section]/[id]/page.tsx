import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteRecordAction, saveRecordAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { emptyRecord, getRecord, serializeFieldInputValue } from "@/lib/admin/cms";
import { getAdminResource, type AdminField } from "@/lib/admin/resources";

function FieldInput({ field, value }: { field: AdminField; value: unknown }) {
  const serializedValue = serializeFieldInputValue(field.type, value);

  if (field.type === "textarea" || field.type === "array") {
    return (
      <textarea
        id={field.name}
        name={field.name}
        defaultValue={serializedValue}
        required={field.required}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select id={field.name} name={field.name} defaultValue={serializedValue}>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type === "money" ? "text" : field.type}
      defaultValue={serializedValue}
      required={field.required}
    />
  );
}

export default async function AdminRecordPage({ params }: PageProps<"/admin/[section]/[id]">) {
  await requireAdmin();
  const { section, id } = await params;
  const resource = getAdminResource(section);

  if (!resource) {
    notFound();
  }

  const isNew = id === "new";
  const record = isNew ? emptyRecord(resource) : await getRecord(resource, id);

  if (!record) {
    notFound();
  }

  return (
    <main>
      <header className="admin-header">
        <div>
          <h1>{isNew ? "Jauns ieraksts" : "Labot ierakstu"}</h1>
          <p>{resource.label}: {resource.description}</p>
        </div>
        <Link className="admin-button" href={`/admin/${resource.section}/`}>
          Atpakaļ
        </Link>
      </header>

      <form className="admin-form" action={saveRecordAction}>
        <input type="hidden" name="_section" value={resource.section} />
        <input type="hidden" name="_id" value={id} />
        {resource.fields.map((field) => (
          <div className="admin-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <FieldInput field={field} value={record[field.name]} />
            {field.help ? <small>{field.help}</small> : null}
          </div>
        ))}
        <div className="admin-form-actions">
          <button className="admin-button" type="submit">Saglabāt</button>
        </div>
      </form>

      {!isNew ? (
        <form className="admin-delete" action={deleteRecordAction}>
          <input type="hidden" name="_section" value={resource.section} />
          <input type="hidden" name="_id" value={id} />
          <button type="submit">Dzēst ierakstu</button>
        </form>
      ) : null}
    </main>
  );
}
