"use client";

import Image from "next/image";
import { useRef } from "react";

const HomeHero = () => {
  const ref = useRef(null);

  return (
    <div
      className="absolute inset-0 top-4 -left-28 aspect-978/678 w-[150%] sm:-top-2 sm:-left-32 md:-left-44 md:w-[150%] lg:-top-10 lg:-left-10 lg:w-[130%] xl:-left-32 xl:w-[130%]"
      id="functions-hero"
      ref={ref}
    >
      {/* Globe background */}
      <Image
        alt="globe wireframe"
        className="block h-full w-full dark:hidden"
        height={400}
        priority
        quality={100}
        src="/images/globe-light.svg"
        width={400}
      />
      <Image
        alt="globe wireframe"
        className="hidden h-full w-full dark:block"
        height={400}
        priority
        quality={100}
        src="/images/globe.svg"
        width={400}
      />
    </div>
  );
};

export default HomeHero;
