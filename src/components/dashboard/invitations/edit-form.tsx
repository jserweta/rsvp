"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { GuestRaw, InvitationsTableType, QrCode } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  updateInvitation,
  UpdateInvitationState,
} from "@/lib/actions/updateInvitation";
import { invitationStatusList } from "@/lib/enum-definitions";

export default function EditInvitationForm({
  invitation,
  invitationMembers,
  availableQrCodes,
}: {
  invitation: InvitationsTableType;
  invitationMembers: GuestRaw[];
  availableQrCodes: QrCode[];
}) {
  const initialState: UpdateInvitationState = { message: null, errors: {} };
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

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* General validation message */}
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

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
              className=" block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
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
            defaultValue={invitation.accessToken ?? ""}
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
                className=" block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
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

        {/* Invitation members */}
        {invitationMembers && (
          <div className="mb-4">
            <p className="text-base font-medium mb-2">Invitation members:</p>
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
        <Button type="submit" aria-disabled={isPending}>
          Edit Invitation
        </Button>
      </div>
    </form>
  );
}
