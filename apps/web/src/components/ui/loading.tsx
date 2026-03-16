import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { AnimatedLoadingSpinner } from "../animated-loading-spinners";

interface LoadingProps extends SVGProps<SVGSVGElement> {
  /** Animation duration, e.g. "124ms" per segment for spinner type or "0.75s" for dots type */
  duration?: string;
  size?: number;
  type?: "spinner" | "dots";
}

const DEFAULT_SPINNER_SEGMENT_MS = 125;
const DEFAULT_DOTS_DURATION_MS = 750;

function parseDurationToMS(duration: string, fallback: number): number {
  const lowerDuration = duration.toLowerCase().trim();

  if (lowerDuration.endsWith("ms")) {
    const msValue = Number.parseFloat(lowerDuration.slice(0, -2));
    return Number.isNaN(msValue) ? fallback : msValue;
  }

  if (lowerDuration.endsWith("s")) {
    const secondsValue = Number.parseFloat(lowerDuration.slice(0, -1));
    return Number.isNaN(secondsValue) ? fallback : secondsValue * 1000;
  }

  return fallback;
}

function Loading({ size, duration, className, type = "spinner", ...props }: LoadingProps) {
  if (type === "dots") {
    const durationMs = duration
      ? parseDurationToMS(duration, DEFAULT_DOTS_DURATION_MS)
      : DEFAULT_DOTS_DURATION_MS;
    return (
      <DotsLoading className={className} durationMs={durationMs} size={size ?? 24} {...props} />
    );
  }

  const segmentTimeInMS = duration
    ? parseDurationToMS(duration, DEFAULT_SPINNER_SEGMENT_MS)
    : DEFAULT_SPINNER_SEGMENT_MS;
  return (
    <AnimatedLoadingSpinner
      className={cn("fill-current", className)}
      segmentTimeInMS={segmentTimeInMS}
      size={size ?? 18}
      {...props}
    />
  );
}

type DotsLoadingProps = SVGProps<SVGSVGElement> & {
  size?: number;
  durationMs: number;
};

const DotsLoading = ({ size, className, durationMs, ...props }: DotsLoadingProps) => {
  const role = props.role ?? "status";
  const ariaLabel = props["aria-label"] ?? "Loading";
  const stagger = durationMs / 3;

  return (
    <svg
      {...props}
      aria-label={ariaLabel}
      className={cn("fill-current", className)}
      height={size}
      role={role}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="motion-reduce:animate-none"
        cx="4"
        cy="12"
        r="3"
        style={{
          animation: `dots-pulse ${durationMs}ms ease-in-out infinite`,
          animationDelay: "0ms",
          transformOrigin: "center",
        }}
      />
      <circle
        className="motion-reduce:animate-none"
        cx="12"
        cy="12"
        r="3"
        style={{
          animation: `dots-pulse ${durationMs}ms ease-in-out infinite`,
          animationDelay: `${stagger}ms`,
          transformOrigin: "center",
        }}
      />
      <circle
        className="motion-reduce:animate-none"
        cx="20"
        cy="12"
        r="3"
        style={{
          animation: `dots-pulse ${durationMs}ms ease-in-out infinite`,
          animationDelay: `${stagger * 2}ms`,
          transformOrigin: "center",
        }}
      />
    </svg>
  );
};

Loading.displayName = "Loading";

export { Loading };
