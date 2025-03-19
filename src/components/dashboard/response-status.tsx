import {
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";

import clsx from "clsx";

export default function Status({ status }: { status: string }) {
  // const label = MY_LABEL_ENUM[status];
  // const icon = MY_ICON_ENUM[status];
  // const style = MY_STYLE_ENUM[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white":
            status === "submitted" || status === "confirmed",
          "bg-red-500 text-white": status === "declined",
        }
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <HiOutlineClock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "submitted" || status === "confirmed" ? (
        <>
          Confirmed
          <HiOutlineCheck className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "declined" ? (
        <>
          Rejected
          <HiOutlineXCircle className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
