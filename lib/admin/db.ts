import pg from "pg";

const { Client } = pg;

export async function adminQuery<T = Record<string, unknown>>(sql: string, params: unknown[] = []) {
  const connectionString = process.env.SUPABASE_DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing SUPABASE_DATABASE_URL.");
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    await client.end();
  }
}
