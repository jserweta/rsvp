import { geistSans } from "@/lib/fonts";
import { IoIosPaperPlane } from "react-icons/io";

export default function Logo() {
  return (
    <div
      className={`${geistSans.className} flex flex-row gap-3 items-center leading-none text-white`}
    >
      <IoIosPaperPlane className="h-12 w-12" />
      <p className="text-[44px]">Rsvp</p>
    </div>
  );
}
