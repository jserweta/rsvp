'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  const isRsvp = pathname.startsWith('/rsvp');

  let headerTitle = '';
  if (isRsvp) {
    headerTitle = 'Anna & Jakub';
  }

  return (
    <nav
      className={`flex items-center justify-center gap-6 px-5 py-5 ${!isRsvp ? 'lg:justify-between' : ''} xl:px-10`}
    >
      {!isRsvp && <div className="hidden flex-1 lg:block"></div>}

      {headerTitle && (
        <>
          <Link
            href="/"
            className="pt-[0.35rem] font-amandine text-4xl leading-[1.15]"
          >
            {headerTitle}
          </Link>
        </>
      )}

      {!isRsvp && (
        <div className="flex flex-1 justify-end gap-6">
          <Button asChild variant="outline" className="leading-none">
            <Link href="/rsvp">RSVP</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
