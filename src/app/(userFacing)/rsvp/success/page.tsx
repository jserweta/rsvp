'use client';

import Header from '@/components/rsvp/header';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  let subTitle = '';
  if (status === 'confirmed') {
    subTitle = 'Do zobaczenia :)';
  }

  return (
    <>
      <Header title="Dziękujemy!" subTitle={subTitle} />
    </>
  );
}
