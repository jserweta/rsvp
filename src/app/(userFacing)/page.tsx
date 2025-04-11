import Hero from '@/components/hero';
import GoogleMap from '@/components/mapSection/googleMap';
import Header from '@/components/header';
import InfoRow from '@/components/infoRow';

export default function Home() {
  const detailedInfo = [
    {
      title: 'Ślub',
      details: [
        'Kościół św. Wawrzyńca w Nowym Sączu',
        'Biegonicka 8',
        '33-300 Nowy Sącz',
      ],
    },
    {
      title: 'Wesele',
      details: ['Willa Poprad', 'Rytro 306', '33-343 Rytro'],
    },
    {
      title: 'Rsvp',
      details: ['Prosimy o potwierdzenie przybycia do', '31 sierpnia 2025'],
    },
  ];

  return (
    <>
      <Hero />

      <section
        id="map-section"
        className="mx-auto flex min-h-[min(100dvh,1080px)] max-w-[1560px] flex-row-reverse flex-wrap items-center gap-16 py-5"
      >
        <div className="flex-1 basis-80">
          <Header title="Szczegóły" className="mt-0" />

          <div className="flex flex-col">
            {detailedInfo.map((row, index) => (
              <InfoRow
                key={`${row.title}_${index}`}
                title={row.title}
                details={row.details}
                {...(index === detailedInfo.length - 1 ? { last: true } : {})}
              />
            ))}
          </div>
        </div>

        <GoogleMap />
      </section>
    </>
  );
}
