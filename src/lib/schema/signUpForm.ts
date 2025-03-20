import { z } from "zod";

export const SignUpFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string(),
});

export const CreateUser = SignUpFormSchema.omit({ id: true }).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  }
);
