/// <reference types="vite/client" />

declare module "*.mjs";

/// Build-time constant set from the Cloudflare deployment environment.
declare const __DEPLOY_CLOUDFLARE__: boolean;
