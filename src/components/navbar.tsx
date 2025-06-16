'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function Navbar() {
  const pathname = usePathname();

  const isRsvp = pathname.startsWith('/rsvp');

  let headerTitle = '';
  if (isRsvp) {
    headerTitle = 'Katarzyna & Tomasz';
  }

  return (
    <nav
      className={`mx-auto flex w-full max-w-[1920px] items-center justify-center gap-6 px-5 py-5 ${!isRsvp ? 'lg:justify-between' : ''} xl:px-10`}
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
