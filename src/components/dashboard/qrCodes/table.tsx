import { fetchFilteredQrCodes } from "@/lib/data/fetchFilteredQrCodes";
import { formatDateToLocal } from "@/lib/utils/formatDateToLocal";
import { MdOutlineUpdate } from "react-icons/md";
import { HiOutlineQrCode } from "react-icons/hi2";
import { DeleteButton, ShowInvitation } from "../action-buttons";
import { deleteQrCode } from "@/lib/actions/deleteQrCode";

export default async function QRCodesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const qrCodes = await fetchFilteredQrCodes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {qrCodes?.map((qrCode) => (
              <div
                key={qrCode.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <p className="mb-2">{qrCode.invitationName}</p>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex gap-2 gap-x-4 flex-col sm:flex-row">
                    <div className="flex items-center gap-3">
                      <HiOutlineQrCode />
                      <p>{qrCode.accessToken.toUpperCase()}</p>
                    </div>

                    {qrCode.usedAt && (
                      <div className="flex flex-nowrap flex-row gap-3 items-center">
                        <MdOutlineUpdate className="w-5 h-5" />
                        {formatDateToLocal(qrCode.usedAt)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    {qrCode.invitationId && (
                      <ShowInvitation id={qrCode.invitationId} />
                    )}
                    <DeleteButton
                      id={qrCode.id}
                      actionFunction={deleteQrCode}
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
                  Access Token
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Invitation name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last form access
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {qrCodes?.map((qrCode) => (
                <tr
                  key={qrCode.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex flex-nowrap flex-row gap-3 items-center">
                      <HiOutlineQrCode className="w-5 h-5" />
                      <p className="mb-0 text-s">
                        {qrCode.accessToken.toUpperCase()}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {qrCode.invitationName}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {qrCode.usedAt && (
                      <div className="flex flex-nowrap flex-row gap-3 items-center">
                        <MdOutlineUpdate className="w-5 h-5" />
                        {formatDateToLocal(qrCode.usedAt)}
                      </div>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {qrCode.invitationId && (
                        <ShowInvitation id={qrCode.invitationId} />
                      )}
                      <DeleteButton
                        id={qrCode.id}
                        actionFunction={deleteQrCode}
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
