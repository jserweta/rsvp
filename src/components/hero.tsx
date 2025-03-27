import { BsDot } from "react-icons/bs";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex justify-center items-center h-[calc(100dvh-140px)] max-w-[1560px] mx-auto">
      <div className="flex gap-10 justify-center items-center w-full">
        <Image
          src="/hero-left.JPEG"
          alt="Left image - Ania"
          width="230"
          height="400"
          className="grayscale-[95%] filter object-cover hidden xl:block max-h-[400px]"
        />

        <div className="relative w-full h-full flex flex-col gap-6 sm:flex-row flex-basis-2 sm:justify-center items-center">
          <h1 className="sm:absolute z-10 w-full font-amandine sm:mt-20 text-6xl sm:text-7xl md:text-9xl text-center text-nowrap self-start">
            11
            <BsDot className="inline-block w-8 h-8 md:w-16 md:h-16" />
            10
            <BsDot className="inline-block w-8 h-8 md:w-16 md:h-16" />
            2025
          </h1>

          <Image
            src="/hero-center.JPEG"
            alt="Center image - together"
            width="430"
            height="650"
            className="grayscale-[95%] filter relative z-0 object-cover max-h-[650px]"
          />
        </div>

        <Image
          src="/hero-right.JPEG"
          alt="Right image - Jakub"
          width="230"
          height="400"
          className="grayscale-[95%] filter object-cover hidden xl:block max-h-[400px]"
        />
      </div>
    </section>
  );
}
