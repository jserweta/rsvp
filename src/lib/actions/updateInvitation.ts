"use server";

import { sql } from "../db";
import { Invitation, QrCode } from "../definitions";
import { UpdateInvitation } from "../schema/invitationForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type UpdateInvitationState = {
  errors?: {
    name?: string[];
    status?: string[];
    needAccommodation?: string[];
    accommodationLocation?: string[];
    accessToken?: string[];
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
    accessToken: formData.get("accessToken"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update guest.",
    };
  }

  try {
    const { accessToken } = validatedFields.data;

    const invitationData = Object.fromEntries(
      Object.entries(validatedFields.data).filter(
        ([key]) => key !== "accessToken"
      )
    ) as Omit<Invitation, "invitationId" | "qrCodeId">;

    const invitationKeys = Object.keys(invitationData) as (keyof Omit<
      Invitation,
      "invitationId" | "qrCodeId"
    >)[];

    let qrCodeId = null;
    if (accessToken) {
      const data = await sql<
        QrCode[]
      >`SELECT id FROM qr_codes WHERE access_token = ${accessToken}`;

      qrCodeId = data[0]?.id ?? null;
    }

    await sql`
      UPDATE public.invitations
      SET ${sql(invitationData, invitationKeys)}, qr_code_id = ${qrCodeId}
      WHERE invitation_id = ${id}
      `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Invitation." };
  }

  revalidatePath("/dashboard/invitations");
  redirect("/dashboard/invitations");
}
