import * as Sentry from "@sentry/tanstackstart-react";
Sentry.init({
	dsn: "https://cffb9ca2b0b24bb1bef9ca6d4a038571@o319034.ingest.us.sentry.io/1807584",
	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
	// Enable logs to be sent to Sentry
	enableLogs: true,
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	// We recommend adjusting this value in production
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
	tracesSampleRate: 1.0,
});