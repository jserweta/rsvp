"use client";

import { geistSans } from "@/lib/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/dashboard/actions";
import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const initialState = { message: "", errors: {} };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const searchParams = useSearchParams();
  const [errorMessage, formAction, isPending] = useActionState(
    signUp,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${geistSans.className} mb-2 text-2xl`}>
          Create new account.
        </h1>
        <p className={`${geistSans.className} mb-3 w-[100%]`}>
          Already have an account,{" "}
          <Link href="/login" className="underline">
            Sign In.
          </Link>
        </p>

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            <div id="name-error" aria-live="polite" aria-atomic="true">
              {errorMessage.errors?.name &&
                errorMessage.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="text"
                name="email"
                placeholder="Enter your email address"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            <div id="email-error" aria-live="polite" aria-atomic="true">
              {errorMessage.errors?.email &&
                errorMessage.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                aria-describedby="password-error"
              />

              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

              <button
                type="button"
                className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900"
                aria-label={
                  showPassword ? "Password Visible" : "Password Invisible."
                }
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>

            <div id="password-error" aria-live="polite" aria-atomic="true">
              {errorMessage.errors?.password &&
                errorMessage.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="passwordConfirm"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Re-enter password"
                aria-describedby="confirm-password-error"
              />

              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

              <button
                type="button"
                className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900"
                aria-label={
                  showPasswordConfirm
                    ? "Password Visible"
                    : "Password Invisible."
                }
                onClick={() => {
                  setShowPasswordConfirm((prev) => !prev);
                }}
              >
                {showPasswordConfirm ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>

            <div
              id="confirm-password-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage.errors?.passwordConfirm &&
                errorMessage.errors.passwordConfirm.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {errorMessage.message && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          </div>
        )}
      </div>
    </form>
  );
}
