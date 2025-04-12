import CardWrapper from '@/components/dashboard/cards';
import { Suspense } from 'react';
import { CardsSkeleton } from '../../skeletons';

export default async function Page() {
  return (
    <>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </>
  );
}
