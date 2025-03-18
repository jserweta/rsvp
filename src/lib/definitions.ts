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
  menuKind: string;
  accommodation: string;
};
export type GuestRaw = Required<Pick<Guest, "guestId" | "name" | "surname">>;

export type GuestsTableType = Guest;
