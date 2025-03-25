import { z } from "zod";

export const SignUpFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  passwordConfirm: z.string(),
});

export const CreateUser = SignUpFormSchema.omit({ id: true }).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  }
);
