"use client";

import { Toaster } from "@/components/ui/sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const invitationAlreadySubmitted = searchParams.get(
    "invitationAlreadySubmitted"
  );

  useEffect(() => {
    if (!invitationAlreadySubmitted) {
      toast.message("Twoje potwierdzenie już zostało wypełnione", {
        description: "Dziękujemy :)",
      });

      params.delete("invitationAlreadySubmitted");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [invitationAlreadySubmitted]);

  return (
    <>
      <main>
        <h1>Strona główna aplikacji</h1>
      </main>

      <Toaster position="top-center" closeButton />
    </>
  );
}
