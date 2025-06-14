import { getSession } from "@/auth/server";
import SectionContainer from "@/components/section-container";
import { buttonVariants } from "@/components/ui/button";
import { cn, fancyId } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface Props {
  h1: string | React.ReactNode;
  subheader?: string[] | React.ReactNode[];
  icon?: any;
  title?: string;
  image?: React.ReactNode;
  footer?: React.ReactNode;
  logo?: boolean;
}

export default async function HomeHeader(props: Props) {
  const session = await getSession();

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
                    className="font-mono text-primary/60 uppercase dark:text-brand"
                    key={`platform-${props.title}`}
                  >
                    {props.title}
                  </span>
                )}
              </div>
            )}
            <h1
              className="h1 text-3xl tracking-[-.15px] md:text-4xl! lg:text-4xl! 2xl:text-6xl!"
              key={"h1"}
            >
              {props.h1}
            </h1>
          </div>
          <div>
            {props.subheader?.map((subheader) => {
              return (
                <p
                  className="p max-w-lg text-muted-foreground lg:max-w-none lg:text-lg"
                  key={fancyId()}
                >
                  {subheader}
                </p>
              );
            })}
          </div>
          <div className="flex flex-row gap-2 md:flex-row md:items-center">
            <Link
              href={session?.user.email ? "/overview" : "/login"}
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "default",
                }),
              )}
            >
              Manage finances
            </Link>
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
