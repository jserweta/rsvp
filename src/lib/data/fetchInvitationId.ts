'use server';

import { Invitation } from '../definitions';
import { sql } from '../utils/db';

export async function fetchInvitationId(token: string) {
  try {
    const data = await sql<Invitation[]>`
      SELECT
        invitations.invitation_id AS invitation_id
      FROM public.qr_codes
      LEFT JOIN invitations ON qr_codes.id = invitations.qr_code_id
      WHERE LOWER(qr_codes.access_token) = ${token.toLowerCase()};
    `;

    return data[0]?.invitationId || '';
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invitation.');
  }
}
