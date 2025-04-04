import AccessTokenForm from '@/components/rsvp/accessTokenForm';
import Header from '@/components/rsvp/header';

export default async function Page() {
  return (
    <>
      <Header
        title="RSVP"
        subTitle="Prosimy o potwierdzenie obecności do 31 sierpnia 2025 roku"
      />
      <AccessTokenForm />
    </>
  );
}
