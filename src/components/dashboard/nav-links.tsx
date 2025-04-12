'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineQrCode,
  HiOutlineUser,
} from 'react-icons/hi2';

const links = [
  { name: 'Home', href: '/dashboard', icon: HiOutlineHome },
  {
    name: 'Invitations',
    href: '/dashboard/invitations',
    icon: HiOutlineEnvelope,
  },
  { name: 'Guests List', href: '/dashboard/guests', icon: HiOutlineUser },
  { name: 'QR Codes', href: '/dashboard/qr-codes', icon: HiOutlineQrCode },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-700 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-slate-200 text-slate-700': pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
