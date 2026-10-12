import "server-only";

import { WebToPayClient } from "paysera-webtopay";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}.`);
  }

  return value;
}

export function getPublicBaseUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (explicitUrl) {
    return explicitUrl.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function getPayseraClient() {
  return new WebToPayClient({
    projectId: Number(getRequiredEnv("PAYSERA_PROJECT_ID")),
    password: getRequiredEnv("PAYSERA_PROJECT_PASSWORD"),
    sandbox: process.env.PAYSERA_SANDBOX !== "false",
  });
}

export function getPayseraTestFlag(): 0 | 1 | undefined {
  return process.env.PAYSERA_TEST_PAYMENT === "true" ||
    process.env.PAYSERA_SANDBOX !== "false"
    ? 1
    : undefined;
}
