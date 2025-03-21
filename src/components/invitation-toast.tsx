"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function InvitationToast({
  isSubmitted,
}: {
  isSubmitted: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (isSubmitted) {
      toast.message("Twoje potwierdzenie już zostało wypełnione", {
        description: "Dziękujemy :)",
      });
      router.push("/");
    }
  }, []);

  return null;
}
