import { Metadata } from "next";
import { fetchGuestsPages } from "@/lib/dashboard/data";
import { geistSans } from "@/lib/fonts";
import { Suspense } from "react";
import { GuestsTableSkeleton } from "../../skeletons";
import Pagination from "@/components/dashboard/pagination";
import GuestsTable from "@/components/dashboard/guests/table";
import Search from "@/components/dashboard/search";

export const metadata: Metadata = {
  title: "Guests",
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchGuestsPages(query);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${geistSans.className} text-2xl`}>Guests list</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search guests..." />
        {/* <CreateGuest /> */}
      </div>
      <Suspense key={query + currentPage} fallback={<GuestsTableSkeleton />}>
        <GuestsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
