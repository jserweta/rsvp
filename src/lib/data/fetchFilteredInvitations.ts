'use server';

import { InvitationsTableType } from '../definitions';
import { sql } from '../utils/db';

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredInvitations(
  query: string,
  currentPage: number,
  invitationId: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<InvitationsTableType[]>`
      SELECT
        invitations.invitation_id,
        invitations.name,
        invitations.need_transport,
        invitations.need_accommodation,
        invitations.accommodation_location,
        invitations.status,
        qr_codes.access_token AS access_token
      FROM invitations
      LEFT JOIN qr_codes ON invitations.qr_code_id = qr_codes.id
      WHERE
        invitations.name ILIKE ${`%${query}%`}
        ${
          invitationId
            ? sql` AND invitations.invitation_id = ${invitationId}`
            : sql``
        }
      ORDER BY invitations.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Invitations table.');
  }
}
