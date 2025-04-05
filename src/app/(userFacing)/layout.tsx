import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'RSVP',
  description: 'Wedding RSVP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="px-5 xl:px-10">{children}</main>

        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
