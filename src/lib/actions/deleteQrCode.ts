"use server";

import { revalidatePath } from "next/cache";
import { sql } from "../db";
import { ActionStatus } from "../definitions";

export async function deleteQrCode(id: string): Promise<ActionStatus> {
  try {
    const isUsed = await sql`
    SELECT invitation_id 
    FROM invitations 
    WHERE qr_code_id = ${id}
  `;

    if (isUsed.length > 0) {
      // jeśli istnieje powiązane zaproszenie
      return {
        type: "error",
        message: "QR code is assigned to an invitation and cannot be deleted.",
      };
    }

    await sql`DELETE FROM qr_codes WHERE id = ${id}`;
    revalidatePath("/dashboard/qr-codes");

    return {
      type: "success",
      message: "QR code deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      type: "error",
      message: "Database Error: QR Code delete failed.",
    };
  }
}
