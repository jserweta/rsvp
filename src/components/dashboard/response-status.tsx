import { AttendanceStatus, InvitationStatus } from '@/lib/enum-definitions';
import clsx from 'clsx';
import { JSX } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

const STATUS_LABEL = {
  [InvitationStatus.CREATED]: 'Created',
  [InvitationStatus.PENDING]: 'Pending',
  [InvitationStatus.VISITED]: 'Visited',
  [InvitationStatus.SUBMITTED]: 'Submitted',
  [AttendanceStatus.CONFIRMED]: 'Confirmed',
  [AttendanceStatus.DECLINED]: 'Declined',
} as const satisfies Record<AttendanceStatus | InvitationStatus, string>;

const STATUS_STYLE = {
  [InvitationStatus.CREATED]: 'bg-gray-100 text-gray-500',
  [InvitationStatus.PENDING]: 'bg-blue-200 text-blue-700',
  [InvitationStatus.SUBMITTED]: 'bg-green-200 text-green-700',
  [InvitationStatus.VISITED]: 'bg-orange-200 text-orange-700',
  [AttendanceStatus.CONFIRMED]: 'bg-green-200 text-green-700',
  [AttendanceStatus.DECLINED]: 'bg-red-200 text-red-700',
} as const satisfies Record<AttendanceStatus | InvitationStatus, string>;

const STATUS_ICON = {
  [InvitationStatus.CREATED]: (
    <MdOutlineDriveFileRenameOutline className="w-4 h-4 text-gray-500" />
  ),
  [InvitationStatus.PENDING]: (
    <HiOutlineClock className="w-4 h-4 text-blue-700" />
  ),
  [InvitationStatus.SUBMITTED]: (
    <HiOutlineCheckCircle className="w-4 h-4 text-green-700" />
  ),
  [InvitationStatus.VISITED]: (
    <HiOutlineEye className="w-4 h-4 text-orange-700" />
  ),
  [AttendanceStatus.CONFIRMED]: (
    <HiOutlineCheckCircle className="w-4 h-4 text-green-700" />
  ),
  [AttendanceStatus.DECLINED]: (
    <HiOutlineXCircle className="w-4 h-4 text-red-700" />
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
        'inline-flex items-center justify-center gap-2 rounded-full px-2 py-1 text-xs  min-w-[100px]',
        STATUS_STYLE[status]
      )}
    >
      {STATUS_LABEL[status]}
      {STATUS_ICON[status]}
    </span>
  );
}
