"use server";

import { connectNeonDB } from "@/db/neon";
import { Group } from "@/types/group";
import { Person } from "@/types/person";

const sql = await connectNeonDB();

export const fetchGroupMembers = async (groupId: string): Promise<Person[]> => {
  const result =
    await sql`select person.person_id, person.name, person.surname from public.person where person.group_id = ${groupId}`;

  return result.map((row) => ({
    personId: row.person_id as string,
    name: row.name as string,
    surname: row.surname as string,
  }));
};

export const fetchGroupInfo = async (groupId: string): Promise<Group> => {
  const result =
    await sql`select need_accommodation, form_filled from public.group where group_id = ${groupId}`;

  return {
    formFilled: result[0]?.form_filled,
    needAccommodation: result[0]?.need_accommodation,
  };
};

export const fetchMenuKinds = async (): Promise<string[]> => {
  const result = await sql`SELECT enum_range(null::menu_kind)`;
  const { enum_range: menuKinds } = result[0];

  return menuKinds.replace(/[{}]/g, "").split(",") || [];
};
