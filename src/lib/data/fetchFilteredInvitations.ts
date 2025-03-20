import { sql } from "../db";
import { InvitationsTableType } from "../definitions";

const ITEMS_PER_PAGE = 15;
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
      invitations.accommodation_location,
      invitations.status
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
