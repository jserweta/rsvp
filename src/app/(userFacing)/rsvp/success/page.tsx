'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SuccessPage />
    </Suspense>
  );
}

function SuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  let subTitle = '';
  let title = '';
  let showDetailsBtn = false;
  switch (status) {
    case 'confirmed':
      title = 'Dziękujemy za potwierdzenie!';
      subTitle = 'Do zobaczenia na weselu! Cieszymy się, że będziecie z nami.';
      showDetailsBtn = true;
      break;
    case 'submitted':
      title = 'Otrzymaliśmy już Waszą odpowiedź!';
      subTitle = 'Jeśli chcielibyście coś zmienić prosimy o kontakt.';
      showDetailsBtn = true;
      break;
    default:
      title = 'Dziękujemy za wiadomość!';
      subTitle =
        'Szkoda, że nie możecie być z nami – mamy nadzieję, że spotkamy się przy innej okazji.';
      showDetailsBtn = false;
      break;
  }

  return (
    <>
      <Header title={title} subTitle={subTitle} />
      {showDetailsBtn && (
        <Button asChild>
          <Link href={'/'}>Szczegóły uroczystości</Link>
        </Button>
      )}
    </>
  );
}
