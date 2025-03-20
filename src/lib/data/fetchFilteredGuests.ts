import { sql } from "../db";
import { GuestsTableType } from "../definitions";

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredGuests(
  query: string,
  currentPage: number,
  invitationId: string
) {
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
      guests.invitation_id
    FROM public.guests
    WHERE
      (guests.name ILIKE ${`%${query}%`} OR
      guests.surname ILIKE ${`%${query}%`})
      ${invitationId ? sql` AND guests.invitation_id = ${invitationId}` : ""}
    ORDER BY guests.invitation_id, guests.name, guests.surname ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch guests table.");
  }
}
