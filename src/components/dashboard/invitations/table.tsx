import { EditButton } from "@/components/dashboard/action-buttons";
import { fetchFilteredInvitations } from "@/lib/dashboard/data";
import { IoBedOutline } from "react-icons/io5";
import Status from "../response-status";

export default async function InvitationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invitations = await fetchFilteredInvitations(query, currentPage);

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
                <div className="flex items-center justify-between border-b pb-4">
                  <p className="mb-2">{invitation.name}</p>

                  <Status status={invitation.status} />
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-nowrap flex-row gap-3 items-center">
                    {invitation.needAccommodation && (
                      <IoBedOutline className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditButton
                      id={invitation.invitationId}
                      page="invitations"
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
                  Needs accommodation
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Response
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
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
                      <IoBedOutline className="w-5 h-5" />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={invitation.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton
                        id={invitation.invitationId}
                        page="invitations"
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
