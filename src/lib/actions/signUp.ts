'use server';

import { getUser } from '@/auth';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateUser } from '../schema/signUpForm';
import { sql } from '../utils/db';

export type StateSignUp = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
  };
  message?: string | null;
};

export async function signUp(prevState: StateSignUp, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Sign Up.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  const user = await getUser(email);
  if (user) {
    return {
      message: 'User already exists. Try Sign In.',
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
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/login');
  redirect('/login');
}
