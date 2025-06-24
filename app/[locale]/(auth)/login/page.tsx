import { AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import posthog from 'posthog-js';
import { auth, getSession } from '@/auth/server';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; correlationId?: string }>;
}) {
  const _session = await getSession();
  const error = (await searchParams).error;
  const correlationId = (await searchParams).correlationId;

  // if (session.session !== null) {
  //   return redirect('/console')
  // }

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <Alert className="bg-background text-left" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
            {correlationId && (
              <>
                <p>Correlation ID: {correlationId}</p>
                <p className="mt-2">
                  Contact us if you have any issues.
                  <a
                    className="font-medium underline"
                    href={`mailto:no-reply@francismasha.com?subject=Login%20Issue%20-%20Correlation%20ID%3A%20${correlationId}`}
                  >
                    no-reply@francismasha.com
                  </a>
                </p>
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <h1 className="mt-8 mb-2 text-xl lg:text-2xl">Login to Plutus</h1>
        <p className="pb-1 font-medium text-muted-foreground">
          Authenticate your account to sign in into your account.
        </p>
      </div>

      <form>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <Button
              className="w-full cursor-pointer rounded-full"
              formAction={async () => {
                'use server';
                const res = await auth.api.signInSocial({
                  body: {
                    provider: 'google',
                    callbackURL: '/overview',
                  },
                });
                posthog.capture('Login', { provider: 'google' });
                if (!res.url) {
                  throw new Error('No URL returned from signInSocial');
                }
                redirect(res.url);
              }}
              size="lg"
              variant="outline"
            >
              <Icons.google className="h-4 w-4" />
              Login with Google
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
