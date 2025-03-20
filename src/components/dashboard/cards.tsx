import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi2";
import { IoBedOutline } from "react-icons/io5";
import { BsPersonCheck, BsPersonDash } from "react-icons/bs";
import { geistSans } from "@/lib/fonts";
import { fetchDashboardSummary } from "@/lib/data/fetchDashboardSummary";
import { IconType } from "react-icons/lib";
import { HiOutlineCheckCircle } from "react-icons/hi2";

const iconMap: Record<CardType, IconType> = {
  guests: HiOutlineUser,
  confirmedGuests: BsPersonCheck,
  declinedGuests: BsPersonDash,
  confirmedAccommodations: IoBedOutline,
  invitations: HiOutlineUserGroup,
  submittedInvitations: HiOutlineCheckCircle,
};

type CardType =
  | "guests"
  | "confirmedGuests"
  | "confirmedAccommodations"
  | "declinedGuests"
  | "invitations"
  | "submittedInvitations";

export default async function CardWrapper() {
  const {
    totalNumberOfGuests,
    totalConfirmedGuests,
    totalConfirmedAccommodations,
    totalDeclinedGuests,
    totalInvitations,
    totalInvitationsSubmissions,
  } = await fetchDashboardSummary();

  return (
    <>
      <Card title="Total Guests" value={totalNumberOfGuests} type="guests" />
      <Card
        title="Confirmed Guests"
        value={totalConfirmedGuests}
        type="confirmedGuests"
      />
      <Card
        title="Declined Guests"
        value={totalDeclinedGuests}
        type="declinedGuests"
      />
      <Card
        title="Confirmed Accommodations"
        value={totalConfirmedAccommodations}
        type="confirmedAccommodations"
      />
      <Card
        title="Total Invitations"
        value={totalInvitations}
        type="invitations"
      />
      <Card
        title="Submitted Invitations"
        value={totalInvitationsSubmissions}
        type="submittedInvitations"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: CardType;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${geistSans.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
