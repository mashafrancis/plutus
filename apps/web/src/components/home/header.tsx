import type React from "react";
import { Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

import SectionContainer from "@/components/section-container";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type Props = {
  h1: string | React.ReactNode;
  subheader?: string[] | React.ReactNode[];
  icon?: React.ElementType;
  title?: string;
  image?: React.ReactNode;
  footer?: React.ReactNode;
  logo?: boolean;
};

export default function HomeHeader(props: Props) {
  const Icon = props.icon;

  return (
    <div className="relative mx-auto w-full max-w-full overflow-hidden bg-muted/30 py-16 lg:py-24">
      <SectionContainer className="grid grid-cols-12 py-0!">
        <div className="relative z-10 col-span-12 grid gap-4 lg:col-span-5">
          <div>
            {(Icon || props.title) && (
              <div className="mb-4 flex items-center gap-3">
                {Icon ? <Icon className="h-4 w-4 text-primary" /> : null}
                {props.title ? (
                  <span className="font-medium text-primary/80 uppercase">
                    {props.title}
                  </span>
                ) : null}
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
            {props.subheader?.map((subheader, index) => (
              <p
                className="max-w-lg text-muted-foreground lg:max-w-none lg:text-lg"
                key={`subheader-${index}`}
              >
                {subheader}
              </p>
            ))}
          </div>

          <div className="flex flex-row gap-2 md:items-center">
            <Authenticated>
              <Link
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "default",
                  })
                )}
                to="/dashboard"
              >
                Manage finances
              </Link>
            </Authenticated>
            <Unauthenticated>
              <Link
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "default",
                  })
                )}
                to="/login"
              >
                Manage finances
              </Link>
            </Unauthenticated>
          </div>
        </div>

        {props.image ? (
          <div className="relative col-span-12 mt-8 min-h-75 lg:col-span-7 lg:mt-0 xl:col-span-6 xl:col-start-7">
            {props.image}
          </div>
        ) : null}

        {props.footer ? (
          <div className="relative z-10 col-span-12 mt-4 md:mt-8 lg:mt-20 xl:mt-32">
            {props.footer}
          </div>
        ) : null}
      </SectionContainer>
    </div>
  );
}
