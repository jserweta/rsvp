import {
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";

import clsx from "clsx";

export default function GuestStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === null,
          "bg-green-500 text-white": String(status) === "true",
          "bg-red-500 text-white": String(status) === "false",
        }
      )}
    >
      {status === null ? (
        <>
          Pending
          <HiOutlineClock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {String(status) === "true" ? (
        <>
          Confirmed
          <HiOutlineCheck className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {String(status) === "false" ? (
        <>
          Rejected
          <HiOutlineXCircle className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
