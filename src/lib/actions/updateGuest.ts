"use server";

import { sql } from "../db";
import { Guest } from "../definitions";
import { UpdateGuest } from "../schema/guestForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type UpdateGuestState = {
  errors?: {
    name?: string[];
    surname?: string[];
    attendance?: string[];
    menuKind?: string[];
    accommodation?: string[];
  };
  message?: string | null;
};

export async function updateGuest(
  id: string,
  prevState: UpdateGuestState,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = UpdateGuest.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    accommodation: formData.get("accommodation") === null ? false : true,
    menuKind: formData.get("menuKind"),
    attendance: formData.get("attendance"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
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
  } catch {
    return { message: "Database Error: Failed to Update Guest." };
  }

  revalidatePath("/dashboard/guests");
  redirect("/dashboard/guests");
}
