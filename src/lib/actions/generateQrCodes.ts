'use server';

import { revalidatePath } from 'next/cache';
import { ActionStatus, Invitation, QrCode } from '../definitions';
import { sql } from '../utils/db';

export default async function generateQrCodes(): Promise<ActionStatus> {
  try {
    const invitations = await sql<Invitation[]>`
      SELECT invitation_id 
      FROM invitations
      WHERE qr_code_id IS NULL
    `;

    if (invitations.length === 0) {
      return Promise.resolve({
        type: 'info',
        message: 'All invitations already have QR codes.',
      });
    }

    const availableQrCodes = await sql<QrCode[]>`
      SELECT id
      FROM qr_codes
      WHERE id NOT IN (
        SELECT qr_code_id FROM invitations WHERE qr_code_id IS NOT NULL
      )
    `;

    const neededQrCodes = invitations.length - availableQrCodes.length;

    if (neededQrCodes <= 0) {
      return Promise.resolve({
        type: 'success',
        message: 'There are enough available QR codes',
      });
    }

    for (let i = 0; i < neededQrCodes; i++) {
      await sql`INSERT INTO qr_codes DEFAULT VALUES`;
    }

    revalidatePath('/dashboard/qr-codes');

    return Promise.resolve({
      type: 'success',
      message: 'QR codes generated successfully.',
    });
  } catch (error) {
    console.error(error);
    return Promise.reject('Error while generating QR codes.');
  }
}
