import { HiOutlinePencil } from "react-icons/hi2";

import Link from "next/link";

export function EditButton({ id, page }: { id: string; page: string }) {
  return (
    <Link
      href={`/dashboard/${page}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <HiOutlinePencil className="w-5" />
    </Link>
  );
}
