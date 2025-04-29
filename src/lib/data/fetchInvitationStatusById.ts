'use server';

import { Invitation } from '../definitions';
import { sql } from '../utils/db';

export async function fetchInvitationStatusById(id: string) {
  try {
    const data = await sql<Invitation[]>`
      SELECT
        invitations.status
      FROM public.invitations
      WHERE invitations.invitation_id = ${id};
    `;

    return data[0]?.status || '';
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invitation status.');
  }
}
