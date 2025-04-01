"use server";

import { sql } from "../utils/db";
import { ActionStatus, Guest } from "../definitions";
import { UpdateGuest } from "../schema/guestForm";
import { revalidatePath } from "next/cache";

export type UpdateGuestStatus = ActionStatus & {
  errors?: {
    name?: string[];
    surname?: string[];
    attendance?: string[];
    menuKind?: string[];
    accommodation?: string[];
    transport?: string[];
  };
};

export async function updateGuest(
  id: string,
  prevState: UpdateGuestStatus,
  formData: FormData
): Promise<UpdateGuestStatus> {
  // Validate form using Zod
  const validatedFields = UpdateGuest.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    transport: formData.get("transport"),
    accommodation: formData.get("accommodation") === null ? false : true,
    menuKind: formData.get("menuKind"),
    attendance: formData.get("attendance"),
  });

  console.log(formData);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update guest.",
    };
  }

  try {
    const keys = Object.keys(validatedFields.data) as (keyof Omit<
      Guest,
      "guestId"
    >)[];

    await sql`
      UPDATE public.guests
      SET ${sql(validatedFields.data, keys)}
      WHERE guest_id = ${id}
    `;

    revalidatePath("/dashboard/guests");

    return {
      type: "success",
      message: "Guest updated.",
    };
  } catch (error) {
    console.error(error);

    return {
      type: "error",
      message: "Database Error: Failed to Update Guest.",
    };
  }
}
