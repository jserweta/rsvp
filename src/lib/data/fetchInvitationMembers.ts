'use server';

import { GuestRaw } from '../definitions';
import { sql } from '../utils/db';

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
    console.error('Database Error:', err);
    throw new Error(
      `Failed to fetch invitation members. InvitationID: ${invitationId}`
    );
  }
};
