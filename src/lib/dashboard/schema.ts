import { z } from "zod";
import { MenuKinds } from "../enum-definitions";

export const GuestFormSchema = z.object({
  guestId: z.string(),
  name: z.string({ message: "Name is required" }),
  surname: z.string({ message: "Surname is required" }),
  menuKind: z.nativeEnum(MenuKinds),
  attendance: z.string().nullable(),
  accommodation: z.boolean(),
});

export const UserFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string(),
});

export const UpdateGuest = GuestFormSchema.omit({
  guestId: true,
});

export const CreateUser = UserFormSchema.omit({ id: true }).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  }
);
