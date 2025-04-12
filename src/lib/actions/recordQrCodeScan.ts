'use server';

import { InvitationStatus } from '../enum-definitions';
import { sql } from '../utils/db';

export default async function recordQrCodeScan(
  accessToken: string,
  invitationId: string
) {
  try {
    await sql.begin(() => [
      sql`
        UPDATE qr_codes 
        SET used_at = NOW() 
        WHERE LOWER(access_token) = ${accessToken.toLowerCase()}
      `,
      sql`
        UPDATE invitations
        SET status = ${InvitationStatus.VISITED}
        WHERE invitation_id = ${invitationId}
      `,
    ]);
  } catch (error) {
    console.error(error);
  }
}
