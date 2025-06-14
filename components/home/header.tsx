import GetStartedButton from "@/components/layout/get-started-button";
import SectionContainer from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import type { CTA } from "@/types/ui.types";
import Link from "next/link";
import type React from "react";

interface Props {
  h1: string | React.ReactNode;
  subheader?: string[] | React.ReactNode[];
  icon?: any;
  title?: string;
  image?: React.ReactNode;
  footer?: React.ReactNode;
  ctas?: CTA[];
  logo?: boolean;
}

export default async function HomeHeader(props: Props) {
  const Icon = props.icon;
  return (
    <div className="relative mx-auto w-full max-w-full overflow-hidden bg-alternative py-16 lg:py-24">
      <SectionContainer className="grid grid-cols-12 py-0!">
        <div className="relative z-10 col-span-12 grid gap-2 lg:col-span-5">
          <div>
            {(Icon || props.title) && (
              <div className="mb-4 flex items-center gap-3">
                {Icon && <Icon size={16} strokeWidth={1.3} />}
                {props.title && (
                  <span
                    className="font-mono text-brand-600 uppercase dark:text-brand"
                    key={`platform-${props.title}`}
                  >
                    {props.title}
                  </span>
                )}
              </div>
            )}
            <h1
              className="h1 text-3xl tracking-[-.15px] md:text-4xl! lg:text-4xl! 2xl:text-6xl!"
              key={`h1`}
            >
              {props.h1}
            </h1>
          </div>
          <div>
            {props.subheader &&
              props.subheader.map((subheader, i) => {
                return (
                  <p
                    className="p max-w-lg text-foreground-lighter lg:max-w-none lg:text-lg"
                    key={i}
                  >
                    {subheader}
                  </p>
                );
              })}
          </div>
          <div className="flex flex-row gap-2 md:flex-row md:items-center">
            {user?.data?.email ? (
              <Link href="/overview">
                <Button size="large" type="primary">
                  Explore app
                </Button>
              </Link>
            ) : (
              <GetStartedButton />
            )}
          </div>
        </div>
        {props.image && (
          <div className="relative col-span-12 mt-8 min-h-[300px] lg:col-span-7 lg:mt-0 xl:col-span-6 xl:col-start-7">
            {props.image}
          </div>
        )}
        {props.footer && (
          <div className="relative z-10 col-span-12 mt-4 md:mt-8 lg:mt-20 xl:mt-32">
            {props.footer}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
