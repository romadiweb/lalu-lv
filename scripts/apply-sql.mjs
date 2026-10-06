import { readFile } from "node:fs/promises";
import process from "node:process";
import pg from "pg";

const { Client } = pg;

const [, , filePath] = process.argv;

if (!filePath) {
  console.error("Usage: node scripts/apply-sql.mjs <file.sql>");
  process.exit(1);
}

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  console.error("Missing SUPABASE_DATABASE_URL.");
  process.exit(1);
}

const sql = await readFile(filePath, "utf8");
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  console.log(`Applied ${filePath}`);
} finally {
  await client.end();
}
