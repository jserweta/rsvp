import Link from "next/link";
import NavLinks from "./nav-links";
import Logo from "@/components/logo";
import { HiOutlinePower } from "react-icons/hi2";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex h-full w-full md:w-64 flex-col px-3 py-4 md:px-2 md:fixed">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-950 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-700 md:flex-none md:justify-start md:p-2 md:px-3">
            <HiOutlinePower className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
