import "server-only";

export function publicSiteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://lalu.lv");
  return new URL(path, base).toString();
}
