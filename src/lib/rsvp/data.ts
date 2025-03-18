"use server";

import { sql } from "@/lib/db";
import { Group, GuestRaw } from "@/lib/definitions";

export const fetchGroupMembers = async (
  groupId: string
): Promise<GuestRaw[]> => {
  const result =
    await sql`SELECT guest.guest_id, guest.name, guest.surname FROM public.guest WHERE guest.group_id = ${groupId} ORDER BY guest.name, guest.surname ASC`;

  return result.map((row) => ({
    guestId: row.guest_id.trim() as string,
    name: row.name.trim() as string,
    surname: row.surname.trim() as string,
  }));
};

export const fetchGroupInfo = async (groupId: string): Promise<Group> => {
  const result =
    await sql`SELECT need_accommodation, form_filled FROM public.group WHERE group_id = ${groupId}`;

  return {
    formFilled: result[0]?.form_filled,
    needAccommodation: result[0]?.need_accommodation,
  };
};

export const fetchMenuKinds = async (): Promise<string[]> => {
  const result = await sql`SELECT enum_range(null::menu_kind)`;
  const { enum_range: menuKinds } = result[0];

  return menuKinds;
};
