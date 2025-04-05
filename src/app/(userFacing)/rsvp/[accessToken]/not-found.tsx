import Header from '@/components/rsvp/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-2">
      <Header
        title="Ups, coś poszło nie tak..."
        subTitle="Upewnij się, że kod jest poprawny. W razie problemów skontaktuj się z nami."
      />

      <Button asChild variant="default" size="default">
        <Link href="/rsvp">Spróbuj ponownie</Link>
      </Button>
    </div>
  );
}
