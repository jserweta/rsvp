"use client";

import {
  HiOutlinePencil,
  HiOutlineEnvelope,
  HiOutlineTrash,
} from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import Link from "next/link";
import { DeleteFunc } from "@/lib/definitions";
import { toast } from "sonner";

export function DeleteButton({
  id,
  actionFunction,
}: {
  id: string;
  actionFunction: DeleteFunc;
}) {
  const deleteWithId = actionFunction.bind(null, id);

  async function handleSubmit() {
    const result = await deleteWithId();

    if (result.type === "success") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form action={handleSubmit}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <HiOutlineTrash className="w-5" />
      </button>
    </form>
  );
}

export function EditButton({
  id,
  page,
  label,
}: {
  id: string;
  page: string;
  label: string;
}) {
  return (
    <Link
      href={`/dashboard/${page}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      aria-label={label}
      title={label}
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
