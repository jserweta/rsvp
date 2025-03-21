import AccessTokenForm from "@/components/rsvp/accessTokenForm";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1>Wprowadź swój kod dostępu</h1>
        <AccessTokenForm />
      </div>
    </>
  );
}
