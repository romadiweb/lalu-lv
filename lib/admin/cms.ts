import "server-only";

import { adminQuery } from "./db";
import { type AdminResource } from "./resources";

function quoteIdent(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function resolveResourceFields(resource: AdminResource) {
  return Promise.all(resource.fields.map(async (field) => {
    if (!field.optionsFrom) {
      return field;
    }

    const source = field.optionsFrom;
    const options = await adminQuery<Record<string, unknown>>(
      `select ${quoteIdent(source.labelColumn)}, ${quoteIdent(source.valueColumn)} from public.${quoteIdent(source.table)} order by ${source.orderBy}`,
    );

    return {
      ...field,
      options: options.map((option) => ({
        label: String(option[source.labelColumn]),
        value: String(option[source.valueColumn]),
      })),
    };
  }));
}

export async function listRecords(resource: AdminResource) {
  return adminQuery<Record<string, unknown>>(
    `select id, ${resource.listColumns.map(quoteIdent).join(", ")} from public.${quoteIdent(resource.table)} order by ${resource.orderBy}`,
  );
}

export async function getRecord(resource: AdminResource, id: string) {
  const [record] = await adminQuery<Record<string, unknown>>(
    `select * from public.${quoteIdent(resource.table)} where id = $1 limit 1`,
    [id],
  );

  if (record && resource.section === "veikala-produkti") {
    const images = await adminQuery<{
      url: string;
      alt: string | null;
      is_primary: boolean;
      sort_order: number;
    }>(
      `
        select url, alt, is_primary, sort_order
        from public.shop_product_images
        where product_id = $1
        order by is_primary desc, sort_order asc, created_at asc
      `,
      [id],
    );

    record.product_images = images;
    record.primary_image_url = images[0]?.url ?? "";
  }

  return record ?? null;
}

export function emptyRecord(resource: AdminResource) {
  const record = Object.fromEntries(
    resource.fields.map((field) => {
      if (field.name === "status") {
        return [field.name, field.options?.[0]?.value ?? "published"];
      }

      if (field.name === "is_active") {
        return [field.name, "true"];
      }

      if (field.name === "currency") {
        return [field.name, "EUR"];
      }

      if (field.name === "author_name" && resource.section === "raksti") {
        return [field.name, "LaLu darbnīca"];
      }

      if (field.type === "date") {
        return [field.name, new Date().toISOString().slice(0, 10)];
      }

      if (field.type === "array" || field.type === "richtext") {
        return [field.name, []];
      }

      if (field.type === "number") {
        return [field.name, 0];
      }

      return [field.name, ""];
    }),
  );

  if (resource.section === "veikala-produkti") {
    record.product_images = [];
  }

  return record;
}

export function serializeFieldValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function serializeFieldInputValue(fieldType: string, value: unknown) {
  if (fieldType === "money") {
    if (value === null || value === undefined || value === "") {
      return "";
    }

    return (Number(value) / 100).toFixed(2);
  }

  return serializeFieldValue(value);
}

export function formatListValue(column: string, value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  if (column === "price_cents") {
    return `${(Number(value) / 100).toFixed(2)} EUR`;
  }

  if (typeof value === "boolean") {
    return value ? "Jā" : "Nē";
  }

  return String(value);
}
