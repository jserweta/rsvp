import { EditButton, ShowGuests } from "@/components/dashboard/action-buttons";
import { fetchFilteredInvitations } from "@/lib/data/fetchFilteredInvitations";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineQrCode } from "react-icons/hi2";
import { IoCarOutline } from "react-icons/io5";
import Status from "../response-status";

export default async function InvitationsTable({
  query,
  currentPage,
  invitationId,
}: {
  query: string;
  currentPage: number;
  invitationId: string;
}) {
  const invitations = await fetchFilteredInvitations(
    query,
    currentPage,
    invitationId
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invitations?.map((invitation) => (
              <div
                key={invitation.invitationId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex gap-2 items-center justify-between border-b pb-4">
                  <p>{invitation.name}</p>

                  <Status status={invitation.status} />
                </div>

                <div className="flex gap-2 w-full items-center justify-between pt-4">
                  {(invitation.needAccommodation ||
                    invitation.accessToken ||
                    invitation.needTransport) && (
                    <div className="flex gap-2 gap-x-4 flex-col sm:flex-row">
                      {invitation.needAccommodation && (
                        <div className="flex flex-nowrap flex-row gap-3 items-center">
                          <IoBedOutline className="w-5 h-5" />
                          {invitation.accommodationLocation && (
                            <p className="mb-0 text-xs">
                              {invitation.accommodationLocation}
                            </p>
                          )}
                        </div>
                      )}
                      {invitation.needTransport && (
                        <div className="flex flex-nowrap flex-row gap-3 items-center">
                          <IoCarOutline className="w-5 h-5" />
                        </div>
                      )}
                      {invitation.accessToken && (
                        <div className="flex flex-nowrap flex-row gap-3 items-center">
                          <HiOutlineQrCode className="w-5 h-5" />
                          <p className="mb-0 text-xs">
                            {invitation.accessToken.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <ShowGuests id={invitation.invitationId} />
                    <EditButton
                      id={invitation.invitationId}
                      page="invitations"
                      label="Edit Invitation"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Accommodation
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Transport
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Access Token
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Response
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invitations?.map((invitation) => (
                <tr
                  key={invitation.invitationId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {invitation.name}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {invitation.needAccommodation && (
                      <div className="flex flex-nowrap flex-row gap-3 items-center">
                        <IoBedOutline className="w-5 h-5" />
                        {invitation.accommodationLocation && (
                          <p className="mb-0 text-s">
                            {invitation.accommodationLocation}
                          </p>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {invitation.needTransport && (
                      <IoCarOutline className="w-5 h-5" />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {invitation.accessToken && (
                      <div className="flex flex-nowrap flex-row gap-3 items-center">
                        <HiOutlineQrCode className="w-5 h-5" />
                        <p className="mb-0 text-s">
                          {invitation.accessToken.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={invitation.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ShowGuests id={invitation.invitationId} />
                      <EditButton
                        id={invitation.invitationId}
                        page="invitations"
                        label="Edit Invitation"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
