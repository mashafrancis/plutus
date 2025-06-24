import 'server-only';

import { headers } from 'next/headers';
import { cache } from 'react';
import { env } from '@/env';
import { initAuth } from '@/lib/auth';

const baseUrl =
  env.VERCEL_ENV === 'production'
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === 'preview'
      ? `https://${env.VERCEL_URL}`
      : 'http://localhost:3000';

export const auth = initAuth({
  baseUrl,
  productionUrl: 'https://plutus.francismasha.com',
  secret: env.BETTER_AUTH_SECRET,
  githubClientId: env.AUTH_GITHUB_ID,
  githubClientSecret: env.AUTH_GITHUB_SECRET,
  googleClientId: env.AUTH_GOOGLE_ID,
  googleClientSecret: env.AUTH_GOOGLE_SECRET,
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);
