import { AttendanceStatus, InvitationStatus } from './enum-definitions';

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
  needTransport: boolean;
  qrCodeId?: string;
  contactEmail: string;
};

export type Guest = {
  guestId: string;
  name?: string;
  surname?: string;
  attendance: AttendanceStatus;
  menuKind: string;
  accommodation: boolean;
  transport: string;
};
export type GuestRaw = Required<Pick<Guest, 'guestId' | 'name' | 'surname'>>;

export type GuestsTableType = Guest;

export type InvitationsTableType = Omit<Invitation, 'qrCodeId'> & {
  accessToken: string;
};

export type QrCode = {
  id: string;
  accessToken: string;
  createdAt: string;
  usedAt: InvitationStatus;
};

export type QrCodesTableType = QrCode & {
  invitationName: string;
  invitationId: string;
};

export type DeleteFunc = (id: string) => Promise<ActionStatus>;

export type ActionStatus = {
  type?: 'error' | 'success' | 'info';
  message?: string | null;
};

export type MapMarker = {
  name: string;
  address: { street: string; city: string };
  link: string;
  position: { lat: number; lng: number };
  icon: React.JSX.Element;
};
