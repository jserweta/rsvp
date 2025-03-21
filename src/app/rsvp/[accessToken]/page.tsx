import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { fetchInvitationById } from "@/lib/data/fetchInvitationById";
import { fetchInvitationMembers } from "@/lib/data/fetchInvitationMembers";
import { GuestRaw, Invitation } from "@/lib/definitions";
import { Stepper } from "@/components/rsvp/stepper";
import { Toaster } from "@/components/ui/sonner";
import { InvitationStatus } from "@/lib/enum-definitions";
import { fetchInvitationId } from "@/lib/data/fetchInvitationId";

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

  if (invitationInfo.status === InvitationStatus.SUBMITTED) {
    redirect("/?invitationAlreadySubmitted");
  }

  return (
    <>
      {invitationInfo.status === InvitationStatus.PENDING && (
        <Stepper
          invitationMembers={invitationMembers}
          needAccommodation={invitationInfo.needAccommodation}
          invitationId={invitationId}
        />
      )}
      <Toaster richColors />
    </>
  );
}
