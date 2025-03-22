import { sql } from "../db";
import { QrCodesTableType } from "../definitions";

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
      qr_codes.invitation_id,
      invitations.name AS invitation_name
		FROM qr_codes
    LEFT JOIN invitations ON qr_codes.invitation_id = invitations.invitation_id
    WHERE
      qr_codes.access_token ILIKE ${`%${query}%`} OR
      invitations.name ILIKE ${`%${query}%`}
		ORDER BY qr_codes.access_token ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch QR Codes table.");
  }
}
