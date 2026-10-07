This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CMS authentication setup

The CMS at `/admin/login/` uses the `admin_users` and `admin_sessions` PostgreSQL tables. It does not use the public Supabase key for login.

1. Copy `.env.example` to `.env.local`.
2. In Supabase, open **Connect** and copy the **Transaction pooler** URI (port `6543`) into `SUPABASE_DATABASE_URL`. Replace the password placeholder and percent-encode reserved password characters.
3. Create or verify the CMS tables and an administrator:

```bash
pnpm cms:migrate

# Add ADMIN_EMAIL and ADMIN_PASSWORD to .env.local first.
pnpm cms:seed
pnpm cms:check
```

Do not commit `.env.local`. Remove `ADMIN_EMAIL` and `ADMIN_PASSWORD` after seeding; the application does not need them at runtime.

For Vercel, add `SUPABASE_DATABASE_URL` to the Production, Preview, and Development environments, then redeploy. Use the same transaction-pooler URI. `SUPABASE_DATABASE_URL` must remain server-only and must never be prefixed with `NEXT_PUBLIC_`.

If login shows an authentication-service error, run `pnpm cms:check` locally with the same database URI. A wrong database password, an unescaped reserved character in the URI, a direct IPv6 URI, missing tables, or a missing administrator will then be reported directly.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
