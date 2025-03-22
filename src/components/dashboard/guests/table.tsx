import Status from "../response-status";
import { fetchFilteredGuests } from "@/lib/data/fetchFilteredGuests";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { EditButton } from "../action-buttons";

export default async function GuestsTable({
  query,
  currentPage,
  invitationId,
}: {
  query: string;
  currentPage: number;
  invitationId: string;
}) {
  const guests = await fetchFilteredGuests(query, currentPage, invitationId);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {guests?.map((guest) => (
              <div
                key={guest.guestId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <p className="mb-2">
                    {guest.name} {guest.surname}
                  </p>

                  <Status status={guest.attendance} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {guest.accommodation && (
                      <IoBedOutline className="w-5 h-5 mb-2" />
                    )}

                    <p className="flex flex-nowrap flex-row gap-3 items-center">
                      <MdOutlineRestaurantMenu className="w-5 h-5" />
                      {guest.menuKind}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditButton id={guest.guestId} page="guests" />
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
                  Menu type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Accommodation
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Attendance
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {guests?.map((guest) => (
                <tr
                  key={guest.guestId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {guest.name} {guest.surname}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {guest.menuKind}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {guest.accommodation && (
                      <IoBedOutline className="w-5 h-5" />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={guest.attendance} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton id={guest.guestId} page="guests" />
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
