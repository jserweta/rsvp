"use server";

import { sql } from "@/lib/db";
import { Invitation, GuestRaw } from "@/lib/definitions";

export const fetchInvitationMembers = async (invitationId: string) => {
  try {
    const data = await sql<GuestRaw[]>`
    SELECT 
      guests.guest_id,
      guests.name, 
      guests.surname 
    FROM public.guests 
    WHERE 
      guests.invitation_id = ${invitationId}
    ORDER BY guests.name, guests.surname ASC
    `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(
      `Failed to fetch invitation members. InvitationID: ${invitationId}`
    );
  }
};

export const fetchInvitationInfo = async (invitationId: string) => {
  try {
    const data = await sql<Invitation[]>`
    SELECT
      need_accommodation,
      form_filled
    FROM invitations 
    WHERE
      invitation_id = ${invitationId}
    `;

    return data[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(
      `Failed to fetch invitation info. InvitationID: ${invitationId}`
    );
  }
};
