import process from "node:process";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  console.error("Missing SUPABASE_DATABASE_URL. Add it to .env.local and to the Vercel project environment variables.");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  const result = await client.query(
    `
      select
        to_regclass('public.admin_users') is not null as users_table_exists,
        to_regclass('public.admin_sessions') is not null as sessions_table_exists,
        case
          when to_regclass('public.admin_users') is not null
          then (select count(*)::integer from public.admin_users)
          else 0
        end as admin_count
    `,
  );
  const status = result.rows[0];

  if (!status.users_table_exists || !status.sessions_table_exists) {
    console.error("CMS tables are missing. Run `pnpm cms:migrate`.");
    process.exitCode = 1;
  } else if (status.admin_count === 0) {
    console.error("CMS tables exist, but no administrator is configured. Set ADMIN_EMAIL and ADMIN_PASSWORD, then run `pnpm cms:seed`.");
    process.exitCode = 1;
  } else {
    console.log(`CMS authentication is ready (${status.admin_count} administrator account${status.admin_count === 1 ? "" : "s"}).`);
  }
} catch (error) {
  console.error("Could not connect to the CMS database.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
