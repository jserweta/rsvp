export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Group = {
  needAccommodation: boolean;
  formFilled: boolean;
};

export type Guest = {
  guestId: string;
  name?: string;
  surname?: string;
  attendance: string;
  menu_kind: string;
  accommodation: string;
};
export type GuestRaw = Required<Pick<Guest, "guestId" | "name" | "surname">>;
