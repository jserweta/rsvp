import { unstable_noStore as noStore } from "next/cache";
import { sql } from "../utils/db";

const ITEMS_PER_PAGE = 15;
export async function fetchGuestsPages(query: string, invitationId: string) {
  noStore();

  try {
    const data = await sql<{ count: [] }[]>`
      SELECT COUNT(*)
      FROM guests
      WHERE
        (guests.name ILIKE ${`%${query}%`} OR
        guests.surname ILIKE ${`%${query}%`})
        ${
          invitationId ? sql`AND guests.invitation_id = ${invitationId}` : sql``
        }
  `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of guests.");
  }
}
