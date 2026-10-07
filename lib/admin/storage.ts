import "server-only";

import crypto from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";

const CMS_BUCKET = "cms-images";
const MAX_UPLOAD_SIZE = 12 * 1024 * 1024;

let bucketReadyPromise: Promise<void> | null = null;

async function ensureCmsBucket() {
  if (!bucketReadyPromise) {
    bucketReadyPromise = (async () => {
      const supabase = createAdminClient();
      const { data: bucket, error: getError } =
        await supabase.storage.getBucket(CMS_BUCKET);

      if (bucket) {
        return;
      }

      if (getError && getError.message !== "Bucket not found") {
        throw new Error(getError.message);
      }

      const { error: createError } = await supabase.storage.createBucket(
        CMS_BUCKET,
        {
          public: true,
          fileSizeLimit: MAX_UPLOAD_SIZE,
          allowedMimeTypes: ["image/webp", "image/jpeg", "image/png"],
        },
      );

      if (createError && createError.message !== "The resource already exists") {
        throw new Error(createError.message);
      }
    })();
  }

  return bucketReadyPromise;
}

function getUploadFolder(fieldName: string) {
  return fieldName.replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
}

function getBaseFileName(upload: File) {
  const parsed = path.parse(upload.name).name || "image";

  return parsed
    .toLocaleLowerCase("lv")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
}

export async function uploadCmsImage(
  upload: FormDataEntryValue | null,
  fieldName: string,
) {
  if (!(upload instanceof File) || upload.size === 0) {
    return null;
  }

  if (!upload.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  if (upload.size > MAX_UPLOAD_SIZE) {
    throw new Error("Image upload is too large. Maximum size is 12 MB.");
  }

  await ensureCmsBucket();

  const sourceBuffer = Buffer.from(await upload.arrayBuffer());
  const compressed = await sharp(sourceBuffer)
    .rotate()
    .resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 5,
    })
    .toBuffer();

  const filePath = [
    getUploadFolder(fieldName),
    `${Date.now()}-${crypto.randomUUID()}-${getBaseFileName(upload)}.webp`,
  ].join("/");

  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(CMS_BUCKET)
    .upload(filePath, compressed, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(CMS_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}
