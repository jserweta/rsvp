import { sql } from "../db";
import { unstable_noStore as noStore } from "next/cache";
import { QrCode } from "../definitions";

export async function fetchAvailableQrCodes() {
  noStore();

  try {
    const data = await sql<QrCode[]>`
      SELECT 
        qr_codes.id,
        qr_codes.access_token
      FROM qr_codes
      LEFT JOIN invitations ON qr_codes.id = invitations.qr_code_id
      WHERE
        invitations.qr_code_id IS NULL
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of qr codes.");
  }
}
