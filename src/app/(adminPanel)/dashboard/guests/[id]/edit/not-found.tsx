import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineFaceFrown } from "react-icons/hi2";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <HiOutlineFaceFrown className="w-[40px] h-[40px] text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested guest.</p>
      <Button asChild variant="default" size="default" className="mt-4">
        <Link href="/dashboard/guests">Go Back</Link>
      </Button>
    </main>
  );
}
