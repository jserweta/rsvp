import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-10 flex gap-6 justify-between items-center">
      <div className="flex-1 hidden lg:block"></div>

      <p className="font-amandine text-5xl">
        Anna <span className="text-3xl">&</span> Jakub
      </p>

      <div className="flex-1 flex gap-6 justify-end">
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/rsvp">RSVP</Link>
        </Button>
      </div>
    </nav>
  );
}
