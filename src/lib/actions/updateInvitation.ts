"use server";

import { sql } from "../db";
import { Invitation } from "../definitions";
import { UpdateInvitation } from "../schema/invitationForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type UpdateInvitationState = {
  errors?: {
    name?: string[];
    status?: string[];
    needAccommodation?: string[];
    accommodationLocation?: string[];
  };
  message?: string | null;
};

export async function updateInvitation(
  id: string,
  prevState: UpdateInvitationState,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = UpdateInvitation.safeParse({
    name: formData.get("name"),
    status: formData.get("status"),
    needAccommodation:
      formData.get("needAccommodation") === null ? false : true,
    accommodationLocation: formData.get("accommodationLocation") ?? "",
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
      Invitation,
      "invitationId"
    >)[];

    await sql`
    UPDATE public.invitations
    SET ${sql(validatedFields.data, keys)}
    WHERE invitation_id = ${id}
  `;
  } catch {
    return { message: "Database Error: Failed to Update Invitation." };
  }

  revalidatePath("/dashboard/invitations");
  redirect("/dashboard/invitations");
}
