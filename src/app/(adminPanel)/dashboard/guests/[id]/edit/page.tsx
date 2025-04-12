import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import EditGuestForm from '@/components/dashboard/guests/edit-form';
import { fetchGuestById } from '@/lib/data/fetchGuestById';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Guest',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const guest = await fetchGuestById(id);

  if (!guest) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Guests', href: '/dashboard/guests' },
          {
            label: 'Edit Guest',
            href: `/dashboard/guests/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditGuestForm guest={guest} />
    </>
  );
}
