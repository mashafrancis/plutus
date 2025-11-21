import { forwardRef, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  id?: string;
  children: ReactNode;
}

const SectionContainer = forwardRef(
  ({ children, className, id }: Props, ref: Ref<HTMLDivElement>) => (
    <section
      className={cn(
        "container relative mx-auto px-6 py-16 sm:py-18 md:py-24 lg:px-16 lg:py-24 xl:px-20",
        className
      )}
      id={id}
      ref={ref}
    >
      {children}
    </section>
  )
);

export default SectionContainer;
