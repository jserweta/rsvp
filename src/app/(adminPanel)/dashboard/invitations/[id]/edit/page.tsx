import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import { fetchInvitationById } from "@/lib/data/fetchInvitationById";
import EditInvitationForm from "@/components/dashboard/invitations/edit-form";
import { fetchInvitationMembers } from "@/lib/data/fetchInvitationMembers";

export const metadata: Metadata = {
  title: "Edit Invitation",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invitation, invitationMembers] = await Promise.all([
    fetchInvitationById(id),
    fetchInvitationMembers(id),
  ]);

  if (!invitation) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invitations", href: "/dashboard/invitations" },
          {
            label: "Edit Invitation",
            href: `/dashboard/invitations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvitationForm
        invitation={invitation}
        invitationMembers={invitationMembers}
      />
    </main>
  );
}
