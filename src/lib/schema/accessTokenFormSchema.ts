import { z } from "zod";

export const accessTokenSchema = z.object({
  accessToken: z
    .string()
    .length(8, { message: "Kod dostępu musi mieć dokładnie 8 znaków." }),
});

export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
