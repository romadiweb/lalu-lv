"use server";

import crypto from "node:crypto";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
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

function fieldSupportsUpload(field: AdminField) {
  return field.name === "image_url" || field.name === "cover_image_url" || field.name === "primary_image_url";
}

async function saveFileUpload(upload: FormDataEntryValue | null) {

  if (!(upload instanceof File) || upload.size === 0) {
    return null;
  }

  if (!upload.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  if (upload.size > 8 * 1024 * 1024) {
    throw new Error("Image upload is too large. Maximum size is 8 MB.");
  }

  const extensionFromName = path.extname(upload.name).toLowerCase();
  const extensionFromType = upload.type.split("/")[1] ? `.${upload.type.split("/")[1]}` : "";
  const extension = (extensionFromName || extensionFromType || ".png").replace(/[^.a-z0-9]/g, "");
  const fileName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "cms");
  const filePath = path.join(uploadDir, fileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, Buffer.from(await upload.arrayBuffer()));

  return `/uploads/cms/${fileName}`;
}

async function saveUploadedFile(fieldName: string, formData: FormData) {
  return saveFileUpload(formData.get(`${fieldName}__file`));
}

async function saveProductImages(productId: string, formData: FormData) {
  const typedUrls = formData.getAll("product_image_url").map((value) => String(value ?? "").trim());
  const altTexts = formData.getAll("product_image_alt").map((value) => String(value ?? "").trim());
  const uploads = formData.getAll("product_image_file");
  const fallbackImageUrl = String(formData.get("primary_image_url") ?? "").trim();
  const fallbackAlt = String(formData.get("name") ?? "").trim();

  const images: Array<{ url: string; alt: string | null; sortOrder: number }> = [];

  for (let index = 0; index < Math.max(typedUrls.length, uploads.length); index += 1) {
    const uploadedUrl = await saveFileUpload(uploads[index] ?? null);
    const imageUrl = uploadedUrl ?? typedUrls[index] ?? "";

    if (!imageUrl) {
      continue;
    }

    images.push({
      url: imageUrl,
      alt: altTexts[index] || fallbackAlt || null,
      sortOrder: images.length,
    });
  }

  if (images.length === 0 && fallbackImageUrl) {
    images.push({
      url: fallbackImageUrl,
      alt: fallbackAlt || null,
      sortOrder: 0,
    });
  }

  await adminQuery("delete from public.shop_product_images where product_id = $1", [productId]);

  for (const [index, image] of images.entries()) {
    await adminQuery(
      `
        insert into public.shop_product_images (product_id, url, alt, is_primary, sort_order)
        values ($1, $2, $3, $4, $5)
      `,
      [productId, image.url, image.alt, index === 0, image.sortOrder],
    );
  }
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

  const regularFields = resource.fields.filter((field) => field.dbColumn !== false);
  const columns = regularFields.map((field) => field.name);
  const values = await Promise.all(regularFields.map(async (field) => {
    const uploadedUrl = fieldSupportsUpload(field) ? await saveUploadedFile(field.name, formData) : null;
    const parsedValue = uploadedUrl ?? parseFieldValue(field, formData);

    if (field.autoSlugFrom && !parsedValue) {
      const sourceValue = String(formData.get(field.autoSlugFrom) ?? "");
      return slugify(sourceValue);
    }

    return parsedValue;
  }));

  let savedRecordId = id;

  if (id === "new") {
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
    const [savedRecord] = await adminQuery<{ id: string }>(
      `insert into public.${quoteIdent(resource.table)} (${columns.map(quoteIdent).join(", ")}) values (${placeholders}) returning id`,
      values,
    );
    savedRecordId = savedRecord.id;
  } else {
    const assignments = columns.map((column, index) => `${quoteIdent(column)} = $${index + 2}`).join(", ");
    await adminQuery(
      `update public.${quoteIdent(resource.table)} set ${assignments}, updated_at = now() where id = $1`,
      [id, ...values],
    );
  }

  if (resource.section === "veikala-produkti") {
    await saveProductImages(savedRecordId, formData);
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
