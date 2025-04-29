'use client';

import { Button } from '@/components/ui/button';
import {
  updateInvitation,
  UpdateInvitationStatus,
} from '@/lib/actions/updateInvitation';
import { GuestRaw, InvitationsTableType, QrCode } from '@/lib/definitions';
import { invitationStatusList } from '@/lib/enum-definitions';
import { toastActionStatus } from '@/lib/utils/toastActionStatus';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

export default function EditInvitationForm({
  invitation,
  invitationMembers,
  availableQrCodes,
}: {
  invitation: InvitationsTableType;
  invitationMembers: GuestRaw[];
  availableQrCodes: QrCode[];
}) {
  const router = useRouter();
  const initialState: UpdateInvitationStatus = { message: null, errors: {} };
  const updateInvitationWithId = updateInvitation.bind(
    null,
    invitation.invitationId
  );

  const [state, formAction, isPending] = useActionState(
    updateInvitationWithId,
    initialState
  );

  const [needAccommodationField, setNeedAccommodationField] = useState(
    !!invitation.needAccommodation
  );

  useEffect(() => {
    toastActionStatus({ message: state.message, type: state.type });

    if (state.type === 'success') router.push('/dashboard/invitations');
  }, [state.message]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Status */}
        <div className="mb-6">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            id="status"
            name="status"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={invitation.status}
            aria-describedby="status-error"
          >
            <option value="" disabled>
              Has the invitation been submitted?
            </option>
            {invitationStatusList.map((item, idx) => (
              <option key={`${item}_${idx}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={invitation.name}
              placeholder="Enter name"
              className="block w-full cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Access token */}
        <div className="mb-6">
          <label
            htmlFor="accessToken"
            className="mb-2 block text-sm font-medium"
          >
            Access token
          </label>

          <select
            id="accessToken"
            name="accessToken"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={invitation.accessToken ?? ''}
            aria-describedby="accessToken-error"
          >
            <option value="">Assign access token</option>
            {invitation.accessToken && (
              <option value={invitation.accessToken}>
                {invitation.accessToken.toUpperCase()}
              </option>
            )}

            {availableQrCodes.map((item, idx) => (
              <option
                key={`${item.accessToken}_${idx}`}
                value={item.accessToken}
              >
                {item.accessToken.toUpperCase()}
              </option>
            ))}
          </select>

          <div id="accessToken-error" aria-live="polite" aria-atomic="true">
            {state.errors?.accessToken &&
              state.errors.accessToken.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Needs accommodation */}
        <div className="mb-4">
          <div className="relative flex items-center gap-3">
            <input
              id="needAccommodation"
              name="needAccommodation"
              type="checkbox"
              checked={needAccommodationField}
              onChange={(e) => setNeedAccommodationField(e.target.checked)}
              className="block w-3 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="needAccommodation-error"
            />
            <label
              htmlFor="needAccommodation"
              className="block text-sm font-medium"
            >
              Needs accommodation
            </label>
          </div>

          <div
            id="needAccommodation-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.needAccommodation &&
              state.errors.needAccommodation.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Accommodation location */}
        {needAccommodationField && (
          <div className="mb-4">
            <label
              htmlFor="accommodationLocation"
              className="mb-2 block text-sm font-medium"
            >
              Accommodation location
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="accommodationLocation"
                name="accommodationLocation"
                type="text"
                defaultValue={invitation.accommodationLocation}
                placeholder="Enter accommodation location"
                className="block w-full cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="accommodationLocation-error"
              />
            </div>

            <div
              id="accommodationLocation-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.accommodationLocation &&
                state.errors.accommodationLocation.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        )}

        {/* Needs transport */}
        <div className="mb-4">
          <div className="relative flex items-center gap-3">
            <input
              id="needTransport"
              name="needTransport"
              type="checkbox"
              defaultChecked={!!invitation.needTransport}
              className="block w-3 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="needTransport-error"
            />
            <label
              htmlFor="needTransport"
              className="block text-sm font-medium"
            >
              Needs transport
            </label>
          </div>

          <div id="needTransport-error" aria-live="polite" aria-atomic="true">
            {state.errors?.needTransport &&
              state.errors.needTransport.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Contact email */}
        <div className="mb-4">
          <label
            htmlFor="contactEmail"
            className="mb-2 block text-sm font-medium"
          >
            Contact email
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="contactEmail"
              name="contactEmail"
              type="text"
              defaultValue={invitation.contactEmail}
              placeholder="Enter email"
              className="block w-full cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="contactEmail-error"
            />
          </div>

          <div id="contactEmail-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contactEmail &&
              state.errors.contactEmail.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="mb-4">
          <label
            htmlFor="additionalInfo"
            className="mb-2 block text-sm font-medium"
          >
            Additional info
          </label>
          <div className="relative mt-2 rounded-md">
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              defaultValue={invitation.additionalInfo}
              placeholder="Enter Additional Info"
              className="block w-full cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="additionalInfo-error"
            />
          </div>

          <div id="additionalInfo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.additionalInfo &&
              state.errors.additionalInfo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invitation members */}
        {invitationMembers && (
          <div className="mb-4">
            <p className="mb-2 text-base font-medium">Invitation members:</p>
            <ul>
              {invitationMembers.map((member) => (
                <li key={member.guestId} className="text-sm">
                  {member.name} {member.surname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invitations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          variant="defaultRounded"
          aria-disabled={isPending}
        >
          Edit Invitation
        </Button>
      </div>
    </form>
  );
}
