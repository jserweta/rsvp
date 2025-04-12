import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import '../globals.css';
import Footer from '@/components/footer';
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
        <main className="min-h-[min(calc(100dvh-76px),calc(1080px-76px))] px-5 xl:px-10">
          {children}
        </main>

        <Footer />
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
