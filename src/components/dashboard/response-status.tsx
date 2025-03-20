import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import clsx from "clsx";
import { AttendanceStatus, InvitationStatus } from "@/lib/enum-definitions";
import { JSX } from "react";

const STATUS_LABEL = {
  [InvitationStatus.PENDING]: "Pending",
  [InvitationStatus.SUBMITTED]: "Submitted",
  [AttendanceStatus.CONFIRMED]: "Confirmed",
  [AttendanceStatus.DECLINED]: "Declined",
} as const satisfies Record<AttendanceStatus | InvitationStatus, string>;

const STATUS_STYLE = {
  [InvitationStatus.PENDING]: "bg-gray-100 text-gray-500",
  [InvitationStatus.SUBMITTED]: "bg-green-200 text-green-700",
  [AttendanceStatus.CONFIRMED]: "bg-green-200 text-green-700",
  [AttendanceStatus.DECLINED]: "bg-red-200 text-red-700",
} as const satisfies Record<AttendanceStatus | InvitationStatus, string>;

const STATUS_ICON = {
  [InvitationStatus.PENDING]: (
    <HiOutlineClock className="ml-1 w-5 h-5 text-gray-500" />
  ),
  [InvitationStatus.SUBMITTED]: (
    <HiOutlineCheckCircle className="ml-1 w-5 h-5 text-green-700" />
  ),
  [AttendanceStatus.CONFIRMED]: (
    <HiOutlineCheckCircle className="ml-1 w-5 h-5 text-green-700" />
  ),
  [AttendanceStatus.DECLINED]: (
    <HiOutlineXCircle className="ml-1 w-5 h-5 text-red-700" />
  ),
} as const satisfies Record<AttendanceStatus | InvitationStatus, JSX.Element>;

export default function Status({
  status,
}: {
  status: InvitationStatus | AttendanceStatus;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-s min-w-[110px]",
        STATUS_STYLE[status]
      )}
    >
      {STATUS_LABEL[status]}
      {STATUS_ICON[status]}
    </span>
  );
}
