import { sql } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { Guest, GuestsTableType, InvitationsTableType } from "../definitions";

const ITEMS_PER_PAGE = 15;

/**
 * Guests page functions
 */
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
      guests.invitation_id
		FROM public.guests
    WHERE
      guests.name ILIKE ${`%${query}%`} OR
      guests.surname ILIKE ${`%${query}%`}
		ORDER BY guests.invitation_id, guests.name, guests.surname ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch guests table.");
  }
}

export async function fetchGuestById(id: string) {
  try {
    const data = await sql<Guest[]>`
      SELECT
        guests.guest_id,
        guests.name,
        guests.surname,
        guests.accommodation,
        guests.menu_kind,
        guests.attendance
      FROM public.guests
      WHERE guests.guest_id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

/**
 * Invitations page functions
 */
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

export async function fetchFilteredInvitations(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<InvitationsTableType[]>`
		SELECT
      invitations.invitation_id,
      invitations.name,
      invitations.need_accommodation,
      invitations.form_filled
		FROM invitations
    WHERE
      invitations.name ILIKE ${`%${query}%`}
		ORDER BY invitations.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch Invitations table.");
  }
}
