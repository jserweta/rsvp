import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineFaceFrown } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <HiOutlineFaceFrown className="w-[40px] h-[40px] text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>

      <p>Nie udało się znaleźć zaproszenia dla podanego kodu dostępu.</p>

      <Button asChild variant="default" size="default" className="mt-4">
        <Link href="/rsvp">Spróbuj ponownie</Link>
      </Button>
    </div>
  );
}
