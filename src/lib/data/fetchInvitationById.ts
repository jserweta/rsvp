'use server';

import { InvitationsTableType } from '../definitions';
import { sql } from '../utils/db';

export async function fetchInvitationById(id: string) {
  try {
    const data = await sql<InvitationsTableType[]>`
      SELECT
        invitations.invitation_id,
        invitations.name,
        invitations.need_accommodation,
        invitations.accommodation_location,
        invitations.status,
        invitations.need_transport,
        invitations.contact_email,
        qr_codes.access_token AS access_token
      FROM public.invitations
      LEFT JOIN qr_codes ON invitations.qr_code_id = qr_codes.id
      WHERE invitations.invitation_id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invitation.');
  }
}
