"use server";

import { connectNeonDB } from "@/db/neon";
import { Group } from "@/app/rsvp/_types/group";
import { Person, PersonIdentity } from "@/app/rsvp/_types/person";

const sql = await connectNeonDB();

export const fetchGroupMembers = async (
  groupId: string
): Promise<PersonIdentity[]> => {
  const result =
    await sql`SELECT person.person_id, person.name, person.surname FROM public.person WHERE person.group_id = ${groupId} ORDER BY person.name, person.surname ASC`;

  return result.map((row) => ({
    personId: row.person_id.trim() as string,
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

  return menuKinds.replace(/[{}]/g, "").split(",") || [];
};

export const submitFormDataToDb = async (
  formValues: Record<string, string>,
  groupId: string
) => {
  const groupedData = Object.entries(formValues).reduce((acc, [key, value]) => {
    const [personId, field] = key.split("_", 2);
    acc[personId] = acc[personId] || { personId };

    switch (field) {
      case "attendance":
        acc[personId].attendance = value;
        break;
      case "menuKind":
        acc[personId].menu_kind = value;
        break;
      case "accommodation":
        acc[personId].accommodation = value;
        break;
      case "name":
        acc[personId].name = value;
        break;
      case "surname":
        acc[personId].surname = value;
        break;
      default:
        break;
    }

    return acc;
  }, {} as Record<string, Partial<Person>>);

  const queries = Object.values(groupedData).map(({ personId, ...fields }) => {
    const updates = Object.entries(fields)
      .map(([key, val]) => `${key} = '${val}'`)
      .join(", ");

    return sql(
      `UPDATE public.person SET ${updates} WHERE person_id = '${personId}'`
    );
  });

  queries.push(
    sql(
      `UPDATE public.group SET form_filled = 'TRUE' WHERE group_id = '${groupId}'`
    )
  );

  try {
    await sql.transaction(queries);
    console.log("Data successfully updated in the database.");
  } catch (error) {
    console.error("Error updating data in the database:", error);
    throw new Error("Transaction failed, no updates were applied.");
  }
};
