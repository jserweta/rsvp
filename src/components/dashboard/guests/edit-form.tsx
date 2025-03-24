"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Guest } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { updateGuest, UpdateGuestStatus } from "@/lib/actions/updateGuest";
import { attendanceStatusList, menuKindsList } from "@/lib/enum-definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditGuestForm({ guest }: { guest: Guest }) {
  const router = useRouter();
  const initialState: UpdateGuestStatus = { message: null, errors: {} };
  const updateGuestWithId = updateGuest.bind(null, guest.guestId);
  const [state, formAction, isPending] = useActionState(
    updateGuestWithId,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      switch (state.type) {
        case "success":
          toast.success(state.message);
          router.push("/dashboard/guests");
          break;
        case "error":
          toast.error(state.message);
          break;
      }
    }
  }, [state.message]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Attendance */}
        <div className="mb-6">
          <label
            htmlFor="attendance"
            className="mb-2 block text-sm font-medium"
          >
            Attendance
          </label>

          <select
            id="attendance"
            name="attendance"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={guest.attendance}
            aria-describedby="attendance-error"
          >
            <option value="" disabled>
              Will the guest be present?
            </option>
            {attendanceStatusList.map((item, idx) => (
              <option key={`${item}_${idx}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div id="attendance-error" aria-live="polite" aria-atomic="true">
            {state.errors?.attendance &&
              state.errors.attendance.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={guest.name}
              placeholder="Enter name"
              className=" block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Surname */}
        <div className="mb-4">
          <label htmlFor="surname" className="mb-2 block text-sm font-medium">
            Surname
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="surname"
              name="surname"
              type="text"
              defaultValue={guest.surname}
              placeholder="Enter surname"
              className=" block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="surname-error"
            />
          </div>

          <div id="surname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.surname &&
              state.errors.surname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Menu kind */}
        <div className="mb-6">
          <label htmlFor="menuKind" className="mb-2 block text-sm font-medium">
            Choose menu kind
          </label>

          <select
            id="menuKind"
            name="menuKind"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={guest.menuKind ?? ""}
            aria-describedby="menuKind-error"
          >
            <option value="" disabled>
              Select a menu kind
            </option>
            {menuKindsList.map((menu, idx) => (
              <option key={`${menu}_${idx}`} value={menu}>
                {menu}
              </option>
            ))}
          </select>

          <div id="menuKind-error" aria-live="polite" aria-atomic="true">
            {state.errors?.menuKind &&
              state.errors.menuKind.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Accommodation */}
        <div className="mb-4">
          <div className="relative flex items-center gap-3">
            <input
              id="accommodation"
              name="accommodation"
              type="checkbox"
              defaultChecked={!!guest.accommodation}
              className=" block w-3 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="accommodation-error"
            />
            <label
              htmlFor="accommodation"
              className="block text-sm font-medium"
            >
              Accommodation
            </label>
          </div>

          <div id="accommodation-error" aria-live="polite" aria-atomic="true">
            {state.errors?.accommodation &&
              state.errors.accommodation.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/guests"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" aria-disabled={isPending}>
          Edit Guest
        </Button>
      </div>
    </form>
  );
}
