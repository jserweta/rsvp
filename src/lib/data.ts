"use server";

import { connectNeonDB } from "@/db/neon";
import { Group } from "@/types/group";
import { Person, PersonIdentity } from "@/types/person";

const sql = await connectNeonDB();

export const fetchGroupMembers = async (
  groupId: string
): Promise<PersonIdentity[]> => {
  const result =
    await sql`select person.person_id, person.name, person.surname from public.person where person.group_id = ${groupId}`;

  return result.map((row) => ({
    personId: row.person_id.trim() as string,
    name: row.name.trim() as string,
    surname: row.surname.trim() as string,
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

export const submitFormDataToDb = async (
  formValues: Record<string, string>
) => {
  const groupedData = Object.entries(formValues).reduce((acc, [key, value]) => {
    const [personId, field] = key.split("_", 2);
    acc[personId] = acc[personId] || { personId };
    acc[personId][field === "menuKind" ? "menu_kind" : field] = value;
    return acc;
  }, {} as Record<string, any>);

  const queries = Object.values(groupedData).map(({ personId, ...fields }) => {
    const updates = Object.entries(fields)
      .map(([key, val]) => `${key} = '${val}'`)
      .join(", ");

    return sql(`UPDATE person SET ${updates} WHERE person_id = '${personId}'`);
  });

  try {
    await sql.transaction(queries);
    console.log("Data successfully updated in the database");
  } catch (error) {
    console.error("Error updating data in the database:", error);
  }
};
