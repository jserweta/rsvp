import { z } from "zod";
import { MenuKinds } from "../enum-definitions";

export const generateSchemaForMember = (
  guestId: string,
  isCompanion: boolean,
  menuKinds: MenuKinds[]
) => {
  const memberSchema = z
    .object({
      [`${guestId}_attendance`]: z.enum(["yes", "no"], {
        required_error: "Będziesz obecny?",
        invalid_type_error: "Będziesz obecny?",
      }),
      [`${guestId}_menuKind`]: z.nativeEnum(MenuKinds).optional(),
      [`${guestId}_accommodation`]: z.string().optional(),
      ...(isCompanion && {
        [`${guestId}_name`]: z.string().optional(),
        [`${guestId}_surname`]: z.string().optional(),
      }),
    })
    .refine(
      (data) => {
        if (data[`${guestId}_attendance`] === "yes") {
          return (
            data[`${guestId}_menuKind`] &&
            menuKinds.includes(data[`${guestId}_menuKind`]! as MenuKinds)
          );
        }
        return true;
      },
      {
        message: "Wybierz rodzaj menu.",
        path: [`${guestId}_menuKind`],
      }
    )
    .refine(
      (data) => {
        if (data[`${guestId}_attendance`] === "yes") {
          return (
            data[`${guestId}_accommodation`] &&
            guestId &&
            ["yes", "no"].includes(data[`${guestId}_accommodation`]!)
          );
        }
        return true;
      },
      {
        message: "Zdecyduj, czy potrzebujesz nocleg.",
        path: [`${guestId}_accommodation`],
      }
    );

  return memberSchema;
};
