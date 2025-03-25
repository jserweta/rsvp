import { sql } from "../db";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 15;
export async function fetchQrCodesPages(query: string) {
  noStore();

  try {
    const data = await sql<{ count: [] }[]>`
    SELECT COUNT(*)
    FROM qr_codes
    WHERE
      LOWER(qr_codes.access_token) ILIKE ${`%${query.toLowerCase()}%`}
  `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of qr codes.");
  }
}
