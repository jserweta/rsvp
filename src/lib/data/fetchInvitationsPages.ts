import { sql } from "../db";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 15;
export async function fetchInvitationsPages(query: string) {
  noStore();

  try {
    const data = await sql<{ count: [] }[]>`
    SELECT COUNT(*)
    FROM invitations
    WHERE
      invitations.name ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invitations.");
  }
}
