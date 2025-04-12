import Header from '@/components/header';
import { Stepper } from '@/components/rsvp/stepper';
import recordQrCodeScan from '@/lib/actions/recordQrCodeScan';
import { fetchInvitationById } from '@/lib/data/fetchInvitationById';
import { fetchInvitationId } from '@/lib/data/fetchInvitationId';
import { fetchInvitationMembers } from '@/lib/data/fetchInvitationMembers';
import { GuestRaw, Invitation } from '@/lib/definitions';
import { InvitationStatus } from '@/lib/enum-definitions';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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
