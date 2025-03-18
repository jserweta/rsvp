import {
  HiOutlinePencil,
  HiOutlineUserPlus,
  HiOutlineTrash,
} from "react-icons/hi2";

import Link from "next/link";
// import { deleteInvoice } from "@/app/lib/actions";

export function CreateGuest() {
  return (
    <Link
      href="/dashboard/guests/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Guest</span>{" "}
      <HiOutlineUserPlus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/guests/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <HiOutlinePencil className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    // <form action={deleteInvoiceWithId}>
    <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Delete</span>
      <HiOutlineTrash className="w-5" />
    </button>
    // </form>
  );
}
