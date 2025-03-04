export type Person = {
  personId: string;
  name?: string;
  surname?: string;
  attendance: string;
  menuKind: string;
  accommodation: string;
};
export type PersonIdentity = Required<
  Pick<Person, "personId" | "name" | "surname">
>;
