import { z } from "zod";
import { InvitationStatus } from "../enum-definitions";

export const InvitationFormSchema = z.object({
  invitationId: z.string(),
  name: z.string({ message: "Name is required" }),
  status: z.nativeEnum(InvitationStatus),
  needAccommodation: z.boolean(),
});

export const UpdateInvitation = InvitationFormSchema.omit({
  invitationId: true,
});
