import Link from "next/link";
import { notFound } from "next/navigation";
import { saveRecordAction } from "@/app/admin/actions";
import { DeleteRecordForm } from "@/app/admin/delete-record-form";
import { requireAdmin } from "@/lib/admin/auth";
import { emptyRecord, getRecord, resolveResourceFields, serializeFieldInputValue } from "@/lib/admin/cms";
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

function fieldSupportsUpload(field: AdminField) {
  return field.name === "image_url" || field.name === "cover_image_url" || field.name === "primary_image_url";
}

type ProductImageRecord = {
  url: string;
  alt: string | null;
};

function ProductImagesInput({ value }: { value: unknown }) {
  const images = Array.isArray(value) ? (value as ProductImageRecord[]) : [];
  const rows = Array.from({ length: Math.max(6, images.length + 1) }, (_, index) => images[index] ?? null);

  return (
    <section className="admin-image-list" aria-labelledby="product-images-title">
      <div className="admin-image-list-header">
        <h2 id="product-images-title">Produkta attēli</h2>
        <p>Pirmais aizpildītais attēls būs galvenais produkta attēls. Tukšās rindas netiek saglabātas.</p>
      </div>

      <div className="admin-image-rows">
        {rows.map((image, index) => (
          <div className="admin-image-row" key={index}>
            <div className="admin-image-row-title">
              <strong>Attēls {index + 1}</strong>
              {index === 0 ? <span>Galvenais</span> : null}
            </div>

            <label htmlFor={`product_image_url_${index}`}>Attēla URL</label>
            <input
              id={`product_image_url_${index}`}
              name="product_image_url"
              type="text"
              defaultValue={image?.url ?? ""}
            />

            <div className="admin-upload">
              <label htmlFor={`product_image_file_${index}`}>Augšupielādēt failu</label>
              <input
                id={`product_image_file_${index}`}
                name="product_image_file"
                type="file"
                accept="image/*"
              />
            </div>

            <label htmlFor={`product_image_alt_${index}`}>Alt teksts</label>
            <input
              id={`product_image_alt_${index}`}
              name="product_image_alt"
              type="text"
              defaultValue={image?.alt ?? ""}
            />
          </div>
        ))}
      </div>
    </section>
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
  const [record, fields] = await Promise.all([
    isNew ? emptyRecord(resource) : getRecord(resource, id),
    resolveResourceFields(resource),
  ]);

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
        {fields.map((field) => (
          <div className="admin-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <FieldInput field={field} value={record[field.name]} />
            {fieldSupportsUpload(field) ? (
              <div className="admin-upload">
                <label htmlFor={`${field.name}__file`}>Augšupielādēt failu</label>
                <input id={`${field.name}__file`} name={`${field.name}__file`} type="file" accept="image/*" />
              </div>
            ) : null}
            {field.help ? <small>{field.help}</small> : null}
          </div>
        ))}
        {resource.section === "veikala-produkti" ? (
          <ProductImagesInput value={record.product_images} />
        ) : null}
        <div className="admin-form-actions">
          <button className="admin-button" type="submit">Saglabāt</button>
        </div>
      </form>

      {!isNew ? (
        <DeleteRecordForm section={resource.section} id={id} />
      ) : null}
    </main>
  );
}
