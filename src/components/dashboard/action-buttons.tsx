import { HiOutlinePencil } from "react-icons/hi2";
import { FaUsersRectangle } from "react-icons/fa6";

import Link from "next/link";

export function EditButton({ id, page }: { id: string; page: string }) {
  return (
    <Link
      href={`/dashboard/${page}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      aria-label="Edit"
      title="Edit"
    >
      <HiOutlinePencil className="w-5" />
    </Link>
  );
}

export function ShowGuests({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/guests?invitationId=${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      aria-label="Show guests list"
      title="Show guests list"
    >
      <FaUsersRectangle className="w-5" />
    </Link>
  );
}
