import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  id?: string;
  children: ReactNode;
}

const SectionContainer = forwardRef<HTMLDivElement, Props>(({ children, className, id }, ref) => (
  <section
    className={cn(
      "container relative mx-auto px-6 py-16 sm:py-20 md:py-24 lg:px-16 lg:py-24",
      className,
    )}
    id={id}
    ref={ref}
  >
    {children}
  </section>
));

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
