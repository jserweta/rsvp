export type Group = {
  needAccommodation: boolean;
  formFilled: boolean;
};

export type Person = {
  personId: string;
  name?: string;
  surname?: string;
  attendance: string;
  menu_kind: string;
  accommodation: string;
};
export type PersonIdentity = Required<
  Pick<Person, "personId" | "name" | "surname">
>;
