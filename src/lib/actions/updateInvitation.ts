'use server';

import { revalidatePath } from 'next/cache';
import { ActionStatus, Invitation, QrCode } from '../definitions';
import { UpdateInvitation } from '../schema/invitationForm';
import { sql } from '../utils/db';

export type UpdateInvitationStatus = ActionStatus & {
  errors?: {
    name?: string[];
    status?: string[];
    needAccommodation?: string[];
    accommodationLocation?: string[];
    needTransport?: string[];
    accessToken?: string[];
    contactEmail?: string[];
    additionalInfo?: string[];
  };
};

export async function updateInvitation(
  id: string,
  prevState: UpdateInvitationStatus,
  formData: FormData
): Promise<UpdateInvitationStatus> {
  // Validate form using Zod
  const validatedFields = UpdateInvitation.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
    needAccommodation:
      formData.get('needAccommodation') === null ? false : true,
    accommodationLocation: formData.get('accommodationLocation') ?? '',
    needTransport: formData.get('needTransport') === null ? false : true,
    contactEmail: formData.get('contactEmail') ?? '',
    additionalInfo: formData.get('additionalInfo') ?? '',
    accessToken:
      formData.get('accessToken') === '' ? null : formData.get('accessToken'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update guest.',
    };
  }

  try {
    const { accessToken } = validatedFields.data;

    const invitationData = Object.fromEntries(
      Object.entries(validatedFields.data).filter(
        ([key]) => key !== 'accessToken'
      )
    ) as Omit<Invitation, 'invitationId' | 'qrCodeId'>;

    const invitationKeys = Object.keys(invitationData) as (keyof Omit<
      Invitation,
      'invitationId' | 'qrCodeId'
    >)[];

    let qrCodeId = null;
    if (accessToken) {
      const data = await sql<QrCode[]>`
        SELECT id 
        FROM qr_codes 
        WHERE LOWER(access_token) = ${accessToken}
      `;

      qrCodeId = data[0]?.id ?? null;
    }

    await sql`
      UPDATE public.invitations
      SET ${sql(invitationData, invitationKeys)}, qr_code_id = ${qrCodeId}
      WHERE invitation_id = ${id}
    `;

    revalidatePath('/dashboard/invitations');

    return {
      type: 'success',
      message: 'Invitation updated.',
    };
  } catch (error) {
    console.error(error);
    return {
      type: 'error',
      message: 'Database Error: Failed to Update Invitation.',
    };
  }
}
