import { z } from "zod";

export const generateSchemaForMember = (
  personId: string,
  isCompanion: boolean,
  menuKinds: string[]
) => {
  const memberSchema = z
    .object({
      [`${personId}_attendance`]: z.enum(["yes", "no"], {
        required_error: "Będziesz obecny?",
        invalid_type_error: "Będziesz obecny?",
      }),
      [`${personId}_menuKind`]: z.string().optional(),
      [`${personId}_accommodation`]: z.string().optional(),
      ...(isCompanion && {
        [`${personId}_name`]: z.string().optional(),
        [`${personId}_surname`]: z.string().optional(),
      }),
    })
    .refine(
      (data) => {
        if (data[`${personId}_attendance`] === "yes") {
          return (
            data[`${personId}_menuKind`] &&
            menuKinds.includes(data[`${personId}_menuKind`]!)
          );
        }
        return true;
      },
      {
        message: "Wybierz rodzaj menu.",
        path: [`${personId}_menuKind`],
      }
    )
    .refine(
      (data) => {
        if (data[`${personId}_attendance`] === "yes") {
          return (
            data[`${personId}_accommodation`] &&
            personId &&
            ["yes", "no"].includes(data[`${personId}_accommodation`]!)
          );
        }
        return true;
      },
      {
        message: "Zdecyduj, czy potrzebujesz nocleg.",
        path: [`${personId}_accommodation`],
      }
    );

  return memberSchema;
};
