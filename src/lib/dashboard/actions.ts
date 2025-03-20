"use server";

import { getUser, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { sql } from "@/lib/db";
import { CreateUser, UpdateGuest, UpdateInvitation } from "./schema";
import { Guest, Invitation } from "../definitions";

/**
 * Actions for guests pages
 */
export type UpdateGuestState = {
  errors?: {
    name?: string[];
    surname?: string[];
    attendance?: string[];
    menuKind?: string[];
    accommodation?: string[];
  };
  message?: string | null;
};

export async function updateGuest(
  id: string,
  prevState: UpdateGuestState,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = UpdateGuest.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    accommodation: formData.get("accommodation") === null ? false : true,
    menuKind: formData.get("menuKind"),
    attendance: formData.get("attendance"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update guest.",
    };
  }

  try {
    const keys = Object.keys(validatedFields.data) as (keyof Omit<
      Guest,
      "guestId"
    >)[];

    await sql`
    UPDATE public.guests
    SET ${sql(validatedFields.data, keys)}
    WHERE guest_id = ${id}
  `;
  } catch {
    return { message: "Database Error: Failed to Update Guest." };
  }

  revalidatePath("/dashboard/guests");
  redirect("/dashboard/guests");
}

/**
 * Actions for invitations pages
 */
export type UpdateInvitationState = {
  errors?: {
    name?: string[];
    status?: string[];
    needAccommodation?: string[];
  };
  message?: string | null;
};

export async function updateInvitation(
  id: string,
  prevState: UpdateGuestState,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = UpdateInvitation.safeParse({
    name: formData.get("name"),
    status: formData.get("status"),
    needAccommodation:
      formData.get("needAccommodation") === null ? false : true,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update guest.",
    };
  }

  try {
    const keys = Object.keys(validatedFields.data) as (keyof Omit<
      Invitation,
      "invitationId"
    >)[];

    await sql`
    UPDATE public.invitations
    SET ${sql(validatedFields.data, keys)}
    WHERE invitation_id = ${id}
  `;
  } catch {
    return { message: "Database Error: Failed to Update Invitation." };
  }

  revalidatePath("/dashboard/invitations");
  redirect("/dashboard/invitations");
}

/**
 * Actions for authentication pages
 */
export type StateSignUp = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(prevState: StateSignUp, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Sign Up.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  const user = await getUser(email);
  if (user) {
    return {
      message: "User already exists. Try Sign In.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
    INSERT INTO users (name, email, password) 
    VALUES (${name}, ${email}, ${hashedPassword})
  `;
  } catch {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}
