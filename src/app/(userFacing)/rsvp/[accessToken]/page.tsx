import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchInvitationById } from '@/lib/data/fetchInvitationById';
import { fetchInvitationMembers } from '@/lib/data/fetchInvitationMembers';
import { GuestRaw, Invitation } from '@/lib/definitions';
import { Stepper } from '@/components/rsvp/stepper';
import { InvitationStatus } from '@/lib/enum-definitions';
import { fetchInvitationId } from '@/lib/data/fetchInvitationId';
import recordQrCodeScan from '@/lib/actions/recordQrCodeScan';
import Header from '@/components/rsvp/header';

export const metadata: Metadata = {
  title: 'Rsvp',
};

export default async function Page(props: {
  params: Promise<{ accessToken: string }>;
}) {
  const params = await props.params;
  const accessToken = params.accessToken;
  const invitationId = await fetchInvitationId(accessToken);

  if (!invitationId) {
    notFound();
  }

  const [invitationInfo, invitationMembers]: [Invitation, GuestRaw[]] =
    await Promise.all([
      fetchInvitationById(invitationId),
      fetchInvitationMembers(invitationId),
    ]);

  if (!invitationInfo || invitationMembers.length === 0) {
    notFound();
  }

  const isSubmitted = invitationInfo.status === InvitationStatus.SUBMITTED;

  if (isSubmitted) {
    redirect('/rsvp/success?status=submitted');
  }

  if (!isSubmitted) {
    recordQrCodeScan(accessToken, invitationId);
  }

  return (
    <>
      <Header
        title="RSVP"
        subTitle="Prosimy o potwierdzenie obecności do 31 sierpnia 2025 roku"
      />
      {!isSubmitted && (
        <Stepper
          invitationMembers={invitationMembers}
          needTransport={invitationInfo.needTransport}
          needAccommodation={invitationInfo.needAccommodation}
          invitationId={invitationId}
        />
      )}
    </>
  );
}
