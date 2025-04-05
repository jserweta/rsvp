import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'RSVP app',
  description: 'Admin dashboard ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dashboard-theme" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
