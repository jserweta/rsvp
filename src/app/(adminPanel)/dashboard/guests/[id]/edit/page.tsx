import { notFound } from "next/navigation";
import { Metadata } from "next";
import EditGuestForm from "@/components/dashboard/guests/edit-form";
import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import { fetchGuestById } from "@/lib/dashboard/data";

export const metadata: Metadata = {
  title: "Edit Guest",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const guest = await fetchGuestById(id);

  if (!guest) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Guests", href: "/dashboard/guests" },
          {
            label: "Edit Guest",
            href: `/dashboard/guests/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditGuestForm guest={guest} />
    </main>
  );
}
