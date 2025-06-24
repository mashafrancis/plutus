import { Layers2Icon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[400px] w-full flex-col items-center justify-center p-8 text-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type EmptyIconProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

EmptyPlaceholder.Icon = function EmptyIcon({
  className,
  children,
}: EmptyIconProps) {
  return (
    <div
      className={cn("flex h-28 w-28 items-center justify-center", className)}
    >
      <div className="relative z-10">
        <div className="-translate-x-1/2 absolute top-0 left-1/2 h-[1px] w-32 bg-gradient-to-r from-[hsla(240,100%,17%,0.01)] via-[hsla(240,100%,10%,0.06)] to-[hsla(240,100%,17%,0.01)] dark:from-[hsla(0,0%,0%,0)] dark:via-[hsla(211,66%,92%,0.3)] dark:to-[hsla(0,0%,0%,0)] " />
        <div className="-translate-x-1/2 absolute bottom-0 left-1/2 h-[1px] w-32 bg-gradient-to-r from-[hsla(240,100%,17%,0.01)] via-[hsla(240,100%,10%,0.06)] to-[hsla(240,100%,17%,0.01)] dark:from-[hsla(0,0%,0%,0)] dark:via-[hsla(211,66%,92%,0.3)] dark:to-[hsla(0,0%,0%,0)] " />
        <div className="-translate-y-1/2 absolute top-1/2 left-0 h-32 w-[1px] bg-gradient-to-t from-[hsla(240,100%,17%,0.01)] via-[hsla(240,100%,10%,0.06)] to-[hsla(240,100%,17%,0.01)] dark:from-[hsla(0,0%,0%,0)] dark:via-[hsla(211,66%,92%,0.3)] dark:to-[hsla(0,0%,0%,0)]" />
        <div className="-translate-y-1/2 absolute top-1/2 right-0 h-32 w-[1px] bg-gradient-to-t from-[hsla(240,100%,17%,0.01)] via-[hsla(240,100%,10%,0.06)] to-[hsla(240,100%,17%,0.01)] dark:from-[hsla(0,0%,0%,0)] dark:via-[hsla(211,66%,92%,0.3)] dark:to-[hsla(0,0%,0%,0)] " />
        <div className="z-50 flex h-16 w-16 items-center justify-center rounded-2xl border-[1px] border-[hsla(240,100%,10%,0.06)] bg-muted text-accent-12 dark:border-[hsla(211,66%,92%,0.2)] [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0">
          <div>{children || <Layers2Icon size="2xl-regular" />}</div>
        </div>
      </div>
    </div>
  );
};

type EmptyPlaceholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

EmptyPlaceholder.Title = function EmptyTitle({
  className,
  ...props
}: EmptyPlaceholderTitleProps) {
  return (
    <h2
      className={cn("mt-3 font-semibold text-lg leading-6", className)}
      {...props}
    />
  );
};

type EmptyPlaceholderDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

EmptyPlaceholder.Description = function EmptyDescription({
  className,
  ...props
}: EmptyPlaceholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mt-2 mb-4 text-center font-normal text-muted-foreground leading-6",
        className,
      )}
      {...props}
    />
  );
};

type EmptyPlaceholderActionsProps = React.HTMLAttributes<HTMLDivElement>;

EmptyPlaceholder.Actions = function EmptyActions({
  className,
  children,
  ...props
}: EmptyPlaceholderActionsProps) {
  return (
    <div
      className={cn(
        "mt-2 flex w-full items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
