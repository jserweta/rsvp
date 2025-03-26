"use server";

import { revalidatePath } from "next/cache";
import { sql } from "../utils/db";
import { ActionStatus } from "../definitions";

export default async function addSingleQrCode(): Promise<ActionStatus> {
  try {
    await sql`INSERT INTO qr_codes DEFAULT VALUES`;
    revalidatePath("/dashboard/qr-codes");

    return {
      type: "success",
      message: "QR code added successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      message: "Something went wrong. Try again later.",
    };
  }
}
