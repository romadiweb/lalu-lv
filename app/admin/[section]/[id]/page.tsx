import Link from "next/link";
import { notFound } from "next/navigation";
import { saveRecordAction } from "@/app/admin/actions";
import { ImageUploadFields } from "@/app/admin/image-upload-fields";
import { ProductTemplatePicker } from "@/app/admin/product-template-picker";
import { RecordFormActions } from "@/app/admin/record-form-actions";
import { RichTextEditor } from "@/app/admin/rich-text-editor";
import { requireAdmin } from "@/lib/admin/auth";
import { emptyRecord, getPublishedProductTemplates, getRecord, resolveResourceFields, serializeFieldInputValue } from "@/lib/admin/cms";
import { prepareRichTextForEditor } from "@/lib/rich-text";
import { getAdminResource, type AdminField } from "@/lib/admin/resources";

function FieldInput({ field, value }: { field: AdminField; value: unknown }) {
  const serializedValue = serializeFieldInputValue(field.type, value);

  if (field.type === "multiselect") {
    const selected = new Set(Array.isArray(value) ? value.map(String) : []);
    return (
      <fieldset id={field.name} className="admin-color-options" aria-label={field.label}>
        {field.options?.map((option) => (
          <label key={option.value}>
            <input type="checkbox" name={field.name} value={option.value} defaultChecked={selected.has(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
        {!field.options?.length ? <p>Pievieno krāsas sadaļā “Produktu krāsas”.</p> : null}
      </fieldset>
    );
  }

  if (field.type === "richtext") {
    return <RichTextEditor name={field.name} initialHtml={prepareRichTextForEditor(value)} />;
  }

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

            <ImageUploadFields
              id={`product_image_url_${index}`}
              urlName="product_image_url"
              fileName="product_image_file"
              initialUrl={image?.url ?? ""}
              altName="product_image_alt"
              initialAlt={image?.alt ?? ""}
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
  const productTemplates = resource.section === "veikala-produkti"
    ? await getPublishedProductTemplates()
    : [];

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

      <form id="admin-record-form" className="admin-form" action={saveRecordAction}>
        <input type="hidden" name="_section" value={resource.section} />
        <input type="hidden" name="_id" value={id} />
        {fields.map((field) => (
          <div className="admin-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {fieldSupportsUpload(field) ? (
              <ImageUploadFields id={field.name} urlName={field.name} fileName={`${field.name}__file`} initialUrl={serializeFieldInputValue(field.type, record[field.name])} required={field.required} />
            ) : <FieldInput field={field} value={record[field.name]} />}
            {field.name === "short_description" && productTemplates.length ? (
              <ProductTemplatePicker templates={productTemplates} />
            ) : null}
            {field.help ? <small>{field.help}</small> : null}
          </div>
        ))}
        {resource.section === "veikala-produkti" ? (
          <ProductImagesInput value={record.product_images} />
        ) : null}
        <RecordFormActions canDelete={!isNew} />
      </form>
    </main>
  );
}
