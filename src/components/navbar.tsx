import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-5 xl:px-10 py-10 flex gap-6 justify-between items-center">
      <div className="flex-1 hidden lg:block"></div>

      <Link href="/" className="font-amandine text-5xl leading-[1.5]">
        Anna <span className="text-3xl">&</span> Jakub
      </Link>

      <div className="flex-1 flex gap-6 justify-end">
        <Button
          asChild
          variant="outline"
          className="rounded-none border-black leading-none"
        >
          <Link href="/rsvp">RSVP</Link>
        </Button>
      </div>
    </nav>
  );
}
