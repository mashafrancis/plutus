import type { TRPCQueryOptions } from '@trpc/tanstack-react-query';
import { unstable_noStore } from 'next/cache';
import { Fragment, type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HydrateClient, prefetch as prefetchTRPC } from '@/trpc/server';

type AwaitProps<T> =
  | {
      promise: Promise<T>;
      children: (data: T) => ReactNode;
      fallback?: ReactNode;
      errorComponent?: ReactNode | null;
      prefetch?: ReturnType<TRPCQueryOptions<any>>[];
    }
  | {
      promise?: undefined;
      children: ReactNode;
      fallback?: ReactNode;
      errorComponent?: ReactNode | null;
      prefetch?: ReturnType<TRPCQueryOptions<any>>[];
    };

export function Await<T>({
  promise,
  children,
  fallback = null,
  errorComponent,
  prefetch,
}: AwaitProps<T>) {
  const MaybeErrorBoundary = errorComponent ? ErrorBoundary : Fragment;

  const innerChildren = promise ? (
    <AwaitResult promise={promise}>{(data) => children(data)}</AwaitResult>
  ) : (
    children
  );

  return (
    <MaybeErrorBoundary fallback={errorComponent}>
      <Suspense fallback={fallback}>
        {prefetch ? (
          <PrefetchAndHydrate prefetch={prefetch}>
            {innerChildren}
          </PrefetchAndHydrate>
        ) : (
          innerChildren
        )}
      </Suspense>
    </MaybeErrorBoundary>
  );
}

type PrefetchAndHydrateProps = {
  prefetch: ReturnType<TRPCQueryOptions<any>>[];
  children: ReactNode;
};

function PrefetchAndHydrate({ prefetch, children }: PrefetchAndHydrateProps) {
  unstable_noStore(); // opt out of pre-rendering
  prefetch.map((p) => {
    prefetchTRPC(p);
  });
  return <HydrateClient>{children}</HydrateClient>;
}

type AwaitResultProps<T> = {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
};

async function AwaitResult<T>({ promise, children }: AwaitResultProps<T>) {
  const data = await promise;
  return <>{children(data)}</>;
}
