"use server";

import postgres from "postgres";

export const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  transform: postgres.toCamel,
});
