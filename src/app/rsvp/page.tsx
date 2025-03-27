import AccessTokenForm from "@/components/rsvp/accessTokenForm";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col gap-3 flex-wrap items-center justify-center h-[calc(100dvh-225px)] sm:h-[calc(100dvh-155px)] max-w-[500px] mx-auto">
        <h1 className="self-start">Wprowadź swój kod dostępu</h1>
        <AccessTokenForm />
      </div>
    </>
  );
}
