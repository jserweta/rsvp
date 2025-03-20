import { geistSans } from "@/lib/fonts";
import { Suspense } from "react";
import { CardsSkeleton } from "../../skeletons";
import CardWrapper from "@/components/dashboard/cards";

export default async function Page() {
  return (
    <main>
      <h1 className={`${geistSans.variable} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </main>
  );
}
