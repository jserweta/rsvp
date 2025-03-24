import { z } from "zod";
import { AttendanceStatus, MenuKinds } from "../enum-definitions";

export const GuestFormSchema = z.object({
  guestId: z.string(),
  name: z.string().nonempty({ message: "Name is required" }),
  surname: z.string().nonempty({ message: "Surname is required" }),
  menuKind: z.nativeEnum(MenuKinds),
  attendance: z.nativeEnum(AttendanceStatus),
  accommodation: z.boolean(),
});

export const UpdateGuest = GuestFormSchema.omit({
  guestId: true,
});
