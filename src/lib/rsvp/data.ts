"use server";

import { sql } from "@/lib/db";
import { Group, GuestRaw } from "@/lib/definitions";

export const fetchGroupMembers = async (groupId: string) => {
  try {
    const data = await sql<GuestRaw[]>`
    SELECT 
      guests.guest_id,
      guests.name, 
      guests.surname 
    FROM public.guests 
    WHERE 
      guests.group_id = ${groupId}
    ORDER BY guests.name, guests.surname ASC
    `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch group members. GroupID: ${groupId}`);
  }
};

export const fetchGroupInfo = async (groupId: string) => {
  try {
    const data = await sql<Group[]>`
    SELECT
      need_accommodation,
      form_filled
    FROM public.group 
    WHERE
      group_id = ${groupId}
    `;

    return data[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch group info. GroupID: ${groupId}`);
  }
};

export const fetchMenuKinds = async () => {
  try {
    const data = await sql<{ enumRange: [] }[]>`
    SELECT 
    enum_range(null::menu_kind)
    `;

    const { enumRange: menuKinds } = data[0];

    return menuKinds;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};
