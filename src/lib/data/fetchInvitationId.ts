import { sql } from "../db";
import { QrCode } from "../definitions";

export async function fetchInvitationId(token: string) {
  try {
    const data = await sql<QrCode[]>`
      SELECT
        qr_codes.invitation_id
      FROM public.qr_codes
      WHERE qr_codes.access_token = ${token};
    `;

    return data[0]?.invitationId || "";
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invitation.");
  }
}
