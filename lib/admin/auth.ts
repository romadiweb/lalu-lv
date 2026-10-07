import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminQuery } from "./db";

const ADMIN_COOKIE = "lalu_admin_session";
const SESSION_DAYS = 7;

type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  password_salt: string;
  iterations: number;
};

type AdminSessionRow = {
  id: string;
  email: string;
};

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hashPassword(password: string, salt: string, iterations: number) {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export async function loginAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLocaleLowerCase("lv");
  const [user] = await adminQuery<AdminUserRow>(
    "select id, email, password_hash, password_salt, iterations from public.admin_users where email = $1 limit 1",
    [normalizedEmail],
  );

  if (!user) {
    return false;
  }

  const attemptedHash = hashPassword(password, user.password_salt, user.iterations);

  if (!safeEqual(attemptedHash, user.password_hash)) {
    return false;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashValue(token);
  await adminQuery(
    `
      insert into public.admin_sessions (admin_user_id, token_hash, expires_at)
      values ($1, $2, now() + interval '${SESSION_DAYS} days')
    `,
    [user.id, tokenHash],
  );

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (token) {
    await adminQuery("delete from public.admin_sessions where token_hash = $1", [hashValue(token)]);
  }

  cookieStore.delete(ADMIN_COOKIE);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const [session] = await adminQuery<AdminSessionRow>(
    `
      select admin_sessions.id, admin_users.email
      from public.admin_sessions
      join public.admin_users on admin_users.id = admin_sessions.admin_user_id
      where admin_sessions.token_hash = $1
        and admin_sessions.expires_at > now()
      limit 1
    `,
    [hashValue(token)],
  );

  return session ?? null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login/");
  }

  return admin;
}
