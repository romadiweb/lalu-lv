"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminQuery } from "@/lib/admin/db";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/admin/auth";
import { getAdminResource, type AdminField } from "@/lib/admin/resources";

function quoteIdent(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("lv")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ā/g, "a")
    .replace(/č/g, "c")
    .replace(/ē/g, "e")
    .replace(/ģ/g, "g")
    .replace(/ī/g, "i")
    .replace(/ķ/g, "k")
    .replace(/ļ/g, "l")
    .replace(/ņ/g, "n")
    .replace(/š/g, "s")
    .replace(/ū/g, "u")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function parseFieldValue(field: AdminField, formData: FormData) {
  const value = String(formData.get(field.name) ?? "").trim();

  if (field.type === "array") {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (field.type === "number") {
    return value ? Number(value) : 0;
  }

  if (field.type === "money") {
    if (!value) {
      return null;
    }

    return Math.round(Number(value.replace(",", ".")) * 100);
  }

  if (field.name === "is_active") {
    return value === "true";
  }

  return value || null;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const success = await loginAdmin(email, password);

  if (!success) {
    redirect("/admin/login/?error=1");
  }

  redirect("/admin/");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login/");
}

export async function saveRecordAction(formData: FormData) {
  await requireAdmin();

  const section = String(formData.get("_section") ?? "");
  const id = String(formData.get("_id") ?? "");
  const resource = getAdminResource(section);

  if (!resource) {
    throw new Error("Unknown CMS section.");
  }

  const columns = resource.fields.map((field) => field.name);
  const values = resource.fields.map((field) => {
    const parsedValue = parseFieldValue(field, formData);

    if (field.autoSlugFrom && !parsedValue) {
      const sourceValue = String(formData.get(field.autoSlugFrom) ?? "");
      return slugify(sourceValue);
    }

    return parsedValue;
  });

  if (id === "new") {
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
    await adminQuery(
      `insert into public.${quoteIdent(resource.table)} (${columns.map(quoteIdent).join(", ")}) values (${placeholders})`,
      values,
    );
  } else {
    const assignments = columns.map((column, index) => `${quoteIdent(column)} = $${index + 2}`).join(", ");
    await adminQuery(
      `update public.${quoteIdent(resource.table)} set ${assignments}, updated_at = now() where id = $1`,
      [id, ...values],
    );
  }

  revalidatePath("/");
  revalidatePath("/aktualitates/");
  revalidatePath("/meistarklases/");
  revalidatePath("/veikals/");
  redirect(`/admin/${section}/`);
}

export async function deleteRecordAction(formData: FormData) {
  await requireAdmin();

  const section = String(formData.get("_section") ?? "");
  const id = String(formData.get("_id") ?? "");
  const resource = getAdminResource(section);

  if (!resource) {
    throw new Error("Unknown CMS section.");
  }

  await adminQuery(`delete from public.${quoteIdent(resource.table)} where id = $1`, [id]);
  revalidatePath("/");
  revalidatePath("/aktualitates/");
  revalidatePath("/meistarklases/");
  revalidatePath("/veikals/");
  redirect(`/admin/${section}/`);
}
