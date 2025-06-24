import * as Sentry from '@sentry/nextjs';
import { type Configuration, registerOTel } from '@vercel/otel';

// Errors from Nested React Server Components
export const onRequestError = Sentry.captureRequestError;

export async function register() {
  const config: Configuration = {
    serviceName: 'plutus',
    instrumentationConfig: {
      fetch: {
        ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
        propagateContextUrls: [/^http:\/\/localhost:\d+/],
        dontPropagateContextUrls: [/no-propagation=1/],
      },
    },
  };

  registerOTel(config);
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
