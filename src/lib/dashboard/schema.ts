import { z } from "zod";
import {
  AttendanceStatus,
  InvitationStatus,
  MenuKinds,
} from "../enum-definitions";

/**
 * Guests pages schema
 */
export const GuestFormSchema = z.object({
  guestId: z.string(),
  name: z.string({ message: "Name is required" }),
  surname: z.string({ message: "Surname is required" }),
  menuKind: z.nativeEnum(MenuKinds),
  attendance: z.nativeEnum(AttendanceStatus),
  accommodation: z.boolean(),
});

export const UpdateGuest = GuestFormSchema.omit({
  guestId: true,
});

/**
 * Invitations pages schema
 */
export const InvitationFormSchema = z.object({
  invitationId: z.string(),
  name: z.string({ message: "Name is required" }),
  status: z.nativeEnum(InvitationStatus),
  needAccommodation: z.boolean(),
});

export const UpdateInvitation = InvitationFormSchema.omit({
  invitationId: true,
});

/**
 * Authentication pages schema
 */
export const UserFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string(),
});

export const CreateUser = UserFormSchema.omit({ id: true }).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  }
);
