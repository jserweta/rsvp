import { sql } from "../db";
import { Invitation } from "../definitions";

export async function fetchInvitationById(id: string) {
  try {
    const data = await sql<Invitation[]>`
      SELECT
        invitations.invitation_id,
        invitations.name,
        invitations.need_accommodation,
        invitations.accommodation_location,
        invitations.status
      FROM public.invitations
      WHERE invitations.invitation_id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invitation.");
  }
}
