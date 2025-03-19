import { Toaster } from "@/components/ui/sonner";
import { fetchInvitationMembers, fetchInvitationInfo } from "@/lib/rsvp/data";
import { Invitation, GuestRaw } from "@/lib/definitions";
import { Stepper } from "../../components/rsvp/stepper";

type SearchParams = {
  invitationId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { invitationId } = await searchParams;

  if (!invitationId) {
    return <p>Please provide a valid invitationId in search parameters.</p>;
  }

  const [invitationMembers, invitationInfo]: [GuestRaw[], Invitation] =
    await Promise.all([
      fetchInvitationMembers(invitationId),
      fetchInvitationInfo(invitationId),
    ]);

  if (invitationMembers.length === 0) {
    return (
      <main className="flex flex-wrap items-center justify-center w-100 h-dvh">
        <p>Invalid invitationId!</p>
      </main>
    );
  }

  return (
    <>
      {!invitationInfo.formFilled ? (
        <Stepper
          invitationMembers={invitationMembers}
          needAccommodation={invitationInfo.needAccommodation}
          invitationId={invitationId}
        />
      ) : (
        <p>Formularz już został wypełniony!</p>
      )}
      <Toaster richColors />
    </>
  );
}
