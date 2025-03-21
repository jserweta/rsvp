import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "RSVP",
  description: "Wedding RSVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        {children}
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
