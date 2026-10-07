import "server-only";

import { adminQuery } from "./db";
import { type AdminResource } from "./resources";

function quoteIdent(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
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
  return record ?? null;
}

export function emptyRecord(resource: AdminResource) {
  return Object.fromEntries(
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

      if (field.type === "array") {
        return [field.name, []];
      }

      if (field.type === "number") {
        return [field.name, 0];
      }

      return [field.name, ""];
    }),
  );
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
