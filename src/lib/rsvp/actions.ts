"use server";

import { Guest } from "@/lib/definitions";
import { sql } from "../db";

export const submitFormDataToDb = async (
  formValues: Record<string, string>,
  groupId: string
) => {
  const groupedData = Object.entries(formValues).reduce((acc, [key, value]) => {
    const [guestId, field] = key.split("_", 2);
    acc[guestId] = acc[guestId] || { guestId };

    switch (field) {
      case "attendance":
        acc[guestId].attendance = value;
        break;
      case "menuKind":
        acc[guestId].menuKind = value;
        break;
      case "accommodation":
        acc[guestId].accommodation = value;
        break;
      case "name":
        acc[guestId].name = value;
        break;
      case "surname":
        acc[guestId].surname = value;
        break;
      default:
        break;
    }

    return acc;
  }, {} as Record<string, Guest>);

  try {
    console.log(sql);
    await sql.begin(async (sql) => {
      const queries = Object.values(groupedData).map(async (guest) => {
        const keys = Object.keys(guest).filter(
          (key) => key !== "guestId"
        ) as (keyof Guest)[];

        return sql`UPDATE public.guests SET ${sql(
          guest,
          keys
        )} WHERE guest_id = ${guest.guestId}`;
      });

      queries.push(
        sql`UPDATE public.group SET form_filled = 'TRUE' WHERE group_id = ${groupId}`
      );

      await Promise.all(queries);
    });

    console.log("Data successfully updated in the database.");
  } catch (error) {
    console.error("Error updating data in the database:", error);
    throw new Error("Transaction failed, no updates were applied.");
  }
};
