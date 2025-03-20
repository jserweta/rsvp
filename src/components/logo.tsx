import { geistSans } from "@/lib/fonts";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

export default function Logo() {
  return (
    <div
      className={`${geistSans.className} flex flex-row items-center leading-none text-white`}
    >
      <HiOutlineGlobeAlt className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Rsvp</p>
    </div>
  );
}
