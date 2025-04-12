import InvitationsTable from '@/components/dashboard/invitations/table';
import Pagination from '@/components/dashboard/pagination';
import Search from '@/components/dashboard/search';
import { fetchInvitationsPages } from '@/lib/data/fetchInvitationsPages';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TableSkeleton } from '../../skeletons';

export const metadata: Metadata = {
  title: 'Invitations',
};

type SearchParams = {
  query?: string;
  page?: string;
  invitationId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    query = '',
    page: currentPage = 1,
    invitationId = '',
  } = (await searchParams) || {};

  const totalPages = await fetchInvitationsPages(query, invitationId);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invitations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invitation..." />
      </div>

      <Suspense key={query + Number(currentPage)} fallback={<TableSkeleton />}>
        <InvitationsTable
          query={query}
          currentPage={Number(currentPage)}
          invitationId={invitationId}
        />
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
