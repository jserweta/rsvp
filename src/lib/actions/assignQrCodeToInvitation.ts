"use server";

import { revalidatePath } from "next/cache";
import { sql } from "../db";
import { ActionStatus, Invitation, QrCode } from "../definitions";

export default async function assignQrCodeToInvitation(): Promise<ActionStatus> {
  try {
    const invitations = await sql<Invitation[]>`
      SELECT invitation_id
      FROM invitations
      WHERE qr_code_id IS NULL
    `;

    if (invitations.length === 0) {
      return {
        type: "info",
        message: "All invitations already have QR codes.",
      };
    }

    const availableQrCodes = await sql<QrCode[]>`
        SELECT id 
        FROM qr_codes
        WHERE id NOT IN (
          SELECT qr_code_id FROM invitations WHERE qr_code_id IS NOT NULL
        )
        ORDER BY created_at ASC
      `;

    if (availableQrCodes.length === 0) {
      return { type: "error", message: "No available QR codes left." };
    }

    let assignedCount = 0;
    for (let i = 0; i < availableQrCodes.length; i++) {
      const qrCodeId = availableQrCodes[i].id;

      await sql`
        UPDATE invitations
        SET qr_code_id = ${qrCodeId}
        WHERE invitation_id = ${invitations[i].invitationId}
      `;

      assignedCount++;
    }

    revalidatePath("/dashboard/qr-codes");
    revalidatePath("/dashboard/invitations");

    if (assignedCount === invitations.length) {
      return {
        type: "success",
        message: "All invitations were successfully assigned QR codes.",
      };
    }

    return {
      type: "info",
      message: `Assigned all available QR codes. ${
        invitations.length - assignedCount
      } invitations remain unassigned.`,
    };
  } catch (error) {
    console.error(error);
    return { type: "error", message: "Error while assigning QR codes." };
  }
}
