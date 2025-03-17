import { geistSans } from "@/lib/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Codes",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${geistSans.variable} mb-4 text-xl md:text-2xl`}>
        QR Codes
      </h1>
    </main>
  );
}
