import { Toaster } from "@/components/ui/sonner";
import {
  fetchGroupMembers,
  fetchGroupInfo,
  fetchMenuKinds,
} from "@/lib/rsvp/data";
import { Group, GuestRaw } from "@/lib/definitions";
import { Stepper } from "../../components/rsvp/stepper";

type SearchParams = {
  groupId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { groupId } = await searchParams;

  if (!groupId) {
    return <p>Please provide a valid groupId in search parameters.</p>;
  }

  const [groupMembers, groupInfo, menuKinds]: [GuestRaw[], Group, string[]] =
    await Promise.all([
      fetchGroupMembers(groupId),
      fetchGroupInfo(groupId),
      fetchMenuKinds(),
    ]).catch((error) => {
      console.error(`Failed to fetch data for group ${groupId}: `, error);
      throw new Error(error);
    });

  if (groupMembers.length === 0) {
    return (
      <main className="flex flex-wrap items-center justify-center w-100 h-dvh">
        <p>Invalid groupId!</p>
      </main>
    );
  }

  return (
    <>
      {!groupInfo.formFilled ? (
        <Stepper
          groupMembers={groupMembers}
          needAccommodation={groupInfo.needAccommodation}
          menuKinds={menuKinds}
          groupId={groupId}
        />
      ) : (
        <p>Formularz już został wypełniony!</p>
      )}
      <Toaster richColors />
    </>
  );
}
