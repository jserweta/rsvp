import { Metadata } from "next";
import { fetchGuestsPages } from "@/lib/data/fetchGuestsPages";
import { geistSans } from "@/lib/fonts";
import { Suspense } from "react";
import { GuestsTableSkeleton } from "../../skeletons";
import Pagination from "@/components/dashboard/pagination";
import GuestsTable from "@/components/dashboard/guests/table";
import Search from "@/components/dashboard/search";

export const metadata: Metadata = {
  title: "Guests",
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
    query = "",
    page: currentPage = 1,
    invitationId = "",
  } = (await searchParams) || {};

  const totalPages = await fetchGuestsPages(query, invitationId);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${geistSans.className} text-2xl`}>Guests list</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search guests..." />
      </div>

      <Suspense
        key={query + Number(currentPage)}
        fallback={<GuestsTableSkeleton />}
      >
        <GuestsTable
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
