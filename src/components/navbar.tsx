"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="px-5 xl:px-10 py-10 flex gap-6 justify-between items-center">
      <div className="flex-1 hidden lg:block"></div>

      <Link
        href="/"
        className="font-amandine text-5xl leading-[1.5] pt-[0.35rem]"
      >
        Anna <span className="text-3xl pb-[0.4rem]">&</span> Jakub
      </Link>

      <div className="flex-1 flex gap-6 justify-end">
        {!pathname.startsWith("/rsvp") && (
          <Button
            asChild
            variant="outline"
            className="rounded-none border-black leading-none"
          >
            <Link href="/rsvp">RSVP</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
