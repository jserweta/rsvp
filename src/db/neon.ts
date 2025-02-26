"use server";

import { neon } from "@neondatabase/serverless";

export async function connectNeonDB() {
  const dbUrl = process.env.DATABASE_URL ?? "";
  const sql = neon(dbUrl);

  return sql;
}
