import { AttendanceStatus, InvitationStatus } from "./enum-definitions";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Invitation = {
  invitationId: string;
  name: string;
  needAccommodation: boolean;
  status: InvitationStatus;
  accommodationLocation: string;
};

export type Guest = {
  guestId: string;
  name?: string;
  surname?: string;
  attendance: AttendanceStatus;
  menuKind: string;
  accommodation: string;
};
export type GuestRaw = Required<Pick<Guest, "guestId" | "name" | "surname">>;

export type GuestsTableType = Guest;

export type InvitationsTableType = Invitation;

export type QrCode = {
  id: string;
  accessToken: string;
  createdAt: string;
  usedAt: InvitationStatus;
  invitationId: string;
};
