import { geistSans } from "@/lib/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guests",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${geistSans.variable} mb-4 text-xl md:text-2xl`}>
        Guests
      </h1>
    </main>
  );
}
