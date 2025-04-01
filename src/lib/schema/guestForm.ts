import { z } from "zod";
import { AttendanceStatus, MenuKinds } from "../enum-definitions";

export const GuestFormSchema = z.object({
  guestId: z.string(),
  name: z.string().nonempty({ message: "Name is required" }),
  surname: z.string().optional(),
  menuKind: z.nativeEnum(MenuKinds),
  attendance: z.nativeEnum(AttendanceStatus),
  accommodation: z.boolean(),
  transport: z.string(),
});

export const UpdateGuest = GuestFormSchema.omit({
  guestId: true,
}).refine(
  (data) => data.name === "os. towarzysząca" || data.surname?.trim() !== "",
  { message: "Surname is required", path: ["surname"] }
);
