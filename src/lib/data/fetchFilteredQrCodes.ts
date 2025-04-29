'use server';

import { QrCodesTableType } from '../definitions';
import { sql } from '../utils/db';

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredQrCodes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<QrCodesTableType[]>`
      SELECT
        qr_codes.id,
        qr_codes.access_token,
        qr_codes.used_at,
        qr_codes.created_at,
        invitations.name AS invitation_name,
        invitations.invitation_id AS invitation_id
      FROM qr_codes
      LEFT JOIN invitations ON qr_codes.id = invitations.qr_code_id
      WHERE
        LOWER(qr_codes.access_token) ILIKE ${`%${query.toLowerCase()}%`} OR
        invitations.name ILIKE ${`%${query}%`}
      ORDER BY (invitations.name IS NULL) DESC, qr_codes.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch QR Codes table.');
  }
}
