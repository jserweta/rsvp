'use client';

import { HiOutlineChevronDown } from 'react-icons/hi2';

export default function Hero() {
  const handleScrollToNextSection = () => {
    document
      .querySelector('#map-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative mx-auto flex min-h-[min(calc(100dvh-76px),calc(1080px-76px))] max-w-[1560px] flex-col items-center justify-center py-5">
      <div className="mx-auto flex w-full max-w-[900px] flex-col justify-center gap-6">
        <h1 className="font-amandine text-6xl leading-[1.15] xl:text-8xl">
          Katarzyna & Tomasz
        </h1>

        <p className="max-w-[500px] text-lg lg:text-xl">
          wraz z&nbsp;rodzicami zapraszają na ślub, który odbędzie się
          20&nbsp;września 2025&nbsp;roku o&nbsp;godzinie 14:00
        </p>
        <p className="max-w-[450px] text-lg lg:text-xl">
          Po&nbsp;uroczystości zaślubin zapraszamy na wesele!
        </p>
      </div>
      <HiOutlineChevronDown
        className="animate-breath bottom-12 mt-8 h-[36px] w-[36px] cursor-pointer text-foreground md:absolute"
        onClick={() => handleScrollToNextSection()}
      />
    </section>
  );
}
