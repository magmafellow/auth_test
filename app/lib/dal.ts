"use server";
import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { redirect } from "next/navigation";
import passwordForDb from "@/key";

import pg from "pg";

const pool = new pg.Pool({
  database: "auth_test",
  password: passwordForDb,
  user: "postgres",
  host: "localhost",
  port: 5432,
});

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) {
    return null;
  }

  try {
    const r = await pool.query("SELECT * FROM person WHERE id = $1", [
      session.userId,
    ]);
    const user = r.rows[0];
    return user;
  } catch (error) {
    console.log("Failed to fetch");
    return null;
  }
});
