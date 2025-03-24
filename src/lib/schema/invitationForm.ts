import { z } from "zod";
import { InvitationStatus } from "../enum-definitions";

export const InvitationFormSchema = z.object({
  invitationId: z.string(),
  name: z.string().nonempty({ message: "Name is required" }),
  status: z.nativeEnum(InvitationStatus),
  needAccommodation: z.boolean(),
  accommodationLocation: z.string().optional(),
  accessToken: z.union([z.string().length(8), z.null()]).optional(),
});

export const UpdateInvitation = InvitationFormSchema.omit({
  invitationId: true,
}).refine(
  (data) => {
    if (data.needAccommodation) {
      return !!data.accommodationLocation;
    }
    return true;
  },
  {
    message: "Location is required",
    path: ["accommodationLocation"],
  }
);
