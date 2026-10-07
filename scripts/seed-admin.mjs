import crypto from "node:crypto";
import process from "node:process";
import pg from "pg";

const { Client } = pg;

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString || !email || !password) {
  console.error("Missing SUPABASE_DATABASE_URL, ADMIN_EMAIL, or ADMIN_PASSWORD.");
  process.exit(1);
}

const iterations = 210000;
const salt = crypto.randomBytes(16).toString("hex");
const passwordHash = crypto
  .pbkdf2Sync(password, salt, iterations, 64, "sha512")
  .toString("hex");

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(
    `
      insert into public.admin_users (email, password_hash, password_salt, iterations)
      values ($1, $2, $3, $4)
      on conflict (email) do update set
        password_hash = excluded.password_hash,
        password_salt = excluded.password_salt,
        iterations = excluded.iterations,
        updated_at = now()
    `,
    [email.toLocaleLowerCase("lv"), passwordHash, salt, iterations],
  );
  console.log(`Seeded admin user ${email}`);
} finally {
  await client.end();
}
