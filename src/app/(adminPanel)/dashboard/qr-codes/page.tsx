import { Metadata } from "next";
import { geistSans } from "@/lib/fonts";
import { Suspense } from "react";
import { TableSkeleton } from "../../skeletons";
import Pagination from "@/components/dashboard/pagination";
import Search from "@/components/dashboard/search";
import { fetchQrCodesPages } from "@/lib/data/fetchQrCodesPages";
import QRCodesTable from "@/components/dashboard/qrCodes/table";
import QRCodesTableActions from "@/components/dashboard/qrCodes/actions-menu";

export const metadata: Metadata = {
  title: "QR Codes",
};

type SearchParams = {
  query?: string;
  page?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query = "", page: currentPage = 1 } = (await searchParams) || {};

  const totalPages = await fetchQrCodesPages(query);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${geistSans.className} text-2xl`}>QR Codes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search QR Code..." />
        <QRCodesTableActions />
      </div>

      <Suspense key={query + Number(currentPage)} fallback={<TableSkeleton />}>
        <QRCodesTable query={query} currentPage={Number(currentPage)} />
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
