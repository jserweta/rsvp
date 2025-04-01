import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchInvitationById } from "@/lib/data/fetchInvitationById";
import { fetchInvitationMembers } from "@/lib/data/fetchInvitationMembers";
import { GuestRaw, Invitation } from "@/lib/definitions";
import { Stepper } from "@/components/rsvp/stepper";
import { InvitationStatus } from "@/lib/enum-definitions";
import { fetchInvitationId } from "@/lib/data/fetchInvitationId";
import InvitationToast from "@/components/invitation-toast";
import recordQrCodeScan from "@/lib/actions/recordQrCodeScan";

export const metadata: Metadata = {
  title: "Rsvp",
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

  if (!isSubmitted) {
    recordQrCodeScan(accessToken, invitationId);
  }

  return (
    <div className="flex flex-col gap-3 flex-wrap items-center pb-6 justify-center max-w-[600px] mx-auto">
      <InvitationToast isSubmitted={isSubmitted} />
      {!isSubmitted && (
        <Stepper
          invitationMembers={invitationMembers}
          needTransport={invitationInfo.needTransport}
          needAccommodation={invitationInfo.needAccommodation}
          invitationId={invitationId}
        />
      )}
    </div>
  );
}
