'use client'

import Image from 'next/image'
import { useRef } from 'react'

const HomeHero = () => {
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      id="functions-hero"
      className="
        absolute inset-0
        -left-28 top-4 w-[150%] md:w-[150%] aspect-[978/678]
        sm:-left-32 sm:-top-2
        md:-left-44
        lg:-left-10 lg:-top-10 lg:w-[130%]
        xl:-left-32 xl:w-[130%]
      "
    >
      {/* Globe background */}
      <Image
        src="/images/globe-light.svg"
        alt="globe wireframe"
        width={400}
        height={400}
        className="w-full h-full dark:hidden block"
        quality={100}
        priority
      />
      <Image
        src="/images/globe.svg"
        alt="globe wireframe"
        width={400}
        height={400}
        className="w-full h-full hidden dark:block"
        quality={100}
        priority
      />
    </div>
  )
}

export default HomeHero
