'use client';

import Header from '@/components/rsvp/header';
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
  switch (status) {
    case 'confirmed':
      title = 'Dziękujemy za potwierdzenie!';
      subTitle = 'Do zobaczenia na weselu! Cieszymy się, że będziecie z nami.';
      break;
    case 'submitted':
      title = 'Otrzymaliśmy już Waszą odpowiedź!';
      subTitle = 'Jeśli chcielibyście coś zmienić prosimy o kontakt.';
      break;
    default:
      title = 'Dziękujemy za wiadomość!';
      subTitle =
        'Szkoda, że nie możecie być z nami – mamy nadzieję, że spotkamy się przy innej okazji.';
      break;
  }

  return <Header title={title} subTitle={subTitle} />;
}
