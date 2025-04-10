import Hero from '@/components/hero';
import GoogleMap from '@/components/mapSection/googleMap';
import Header from '@/components/header';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto flex min-h-[min(calc(100dvh-76px),1080px)] max-w-[1560px] flex-row flex-wrap items-center gap-10 py-5">
        <GoogleMap />
        <div className="flex-1">
          <Header title="Szczegóły" center />
        </div>
      </section>
    </>
  );
}
