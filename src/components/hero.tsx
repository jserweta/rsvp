export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[min(calc(100dvh-76px),calc(1080px-76px))] max-w-[1560px] items-center justify-center py-5">
      <div className="mx-auto flex w-full max-w-[900px] flex-col justify-center gap-6">
        <p className="text-xl">Wraz z rodzicami</p>

        <h1 className="font-amandine text-8xl leading-[1.15]">Anna & Jakub</h1>

        <p className="text-xl">
          Zapraszają na ślub, który odbędzie się
          <br />
          11 października 2025 roku o godzinie 13:00
          <br />
          <br />
          Po uroczystości zaślubin zapraszamy na wesele!
        </p>
      </div>
    </section>
  );
}
