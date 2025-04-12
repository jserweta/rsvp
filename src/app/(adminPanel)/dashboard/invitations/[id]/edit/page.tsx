import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import EditInvitationForm from '@/components/dashboard/invitations/edit-form';
import { fetchAvailableQrCodes } from '@/lib/data/fetchAvailableQrCodes';
import { fetchInvitationById } from '@/lib/data/fetchInvitationById';
import { fetchInvitationMembers } from '@/lib/data/fetchInvitationMembers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Invitation',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invitation, invitationMembers, availableQrCodes] = await Promise.all([
    fetchInvitationById(id),
    fetchInvitationMembers(id),
    fetchAvailableQrCodes(),
  ]);

  if (!invitation) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invitations', href: '/dashboard/invitations' },
          {
            label: 'Edit Invitation',
            href: `/dashboard/invitations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvitationForm
        invitation={invitation}
        invitationMembers={invitationMembers}
        availableQrCodes={availableQrCodes}
      />
    </>
  );
}
