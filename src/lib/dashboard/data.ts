import { sql } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { Guest, GuestsTableType } from "../definitions";

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredGuests(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<GuestsTableType[]>`
		SELECT
      guests.guest_id,
      guests.name,
      guests.surname,
      guests.accommodation,
      guests.menu_kind,
      guests.attendance,
      guests.group_id
		FROM public.guests
    WHERE
      guests.name ILIKE ${`%${query}%`} OR
      guests.surname ILIKE ${`%${query}%`}
		ORDER BY guests.group_id, guests.name, guests.surname ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

export async function fetchGuestsPages(query: string) {
  noStore();

  try {
    const data = await sql<{ count: [] }[]>`
    SELECT COUNT(*)
    FROM guests
    WHERE
      guests.name ILIKE ${`%${query}%`} OR
      guests.surname ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of guests.");
  }
}
