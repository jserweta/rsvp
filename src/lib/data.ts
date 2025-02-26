"use server";

import { connectNeonDB } from "@/db/neon";

const sql = await connectNeonDB();

export const fetchGroupMembers = async (
  groupId: string
): Promise<string[] | any> => {
  const groupMembers =
    await sql`select person.name, person.surname from public.person where group_id = ${groupId}`;

  return groupMembers;
};

export const fetchGroupNeedAccommodation = async (
  groupId: string
): Promise<boolean | any> => {
  const needAccommodation =
    await sql`select group.need_accommodation from public.group where group_id = ${groupId}`;

  return needAccommodation;
};

export const fetchMenuKinds = async (): Promise<string[] | any> => {
  const result = await sql`SELECT enum_range(null::menu_kind)`;

  return result[0]?.enum_range.replace(/[{}]/g, "").split(",") || [];
};
