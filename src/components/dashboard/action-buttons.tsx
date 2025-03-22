import { HiOutlinePencil, HiOutlineEnvelope } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
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
      <PiUsersThree className="w-5" />
    </Link>
  );
}

export function ShowInvitation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invitations?invitationId=${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      aria-label="Show connected invitation"
      title="Show connected invitation"
    >
      <HiOutlineEnvelope className="w-5" />
    </Link>
  );
}
