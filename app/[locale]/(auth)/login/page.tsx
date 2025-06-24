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
            {/*<Button*/}
            {/*  variant="outline"*/}
            {/*  className="w-full"*/}
            {/*  formAction={async () => {*/}
            {/*    "use server";*/}
            {/*    const res = await auth.api.signInSocial({*/}
            {/*      body: {*/}
            {/*        provider: "github",*/}
            {/*        callbackURL: "/overview",*/}
            {/*      },*/}
            {/*    });*/}
            {/*    if (!res.url) {*/}
            {/*      throw new Error("No URL returned from signInSocial");*/}
            {/*    }*/}
            {/*    redirect(res.url);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">*/}
            {/*    <path*/}
            {/*      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"*/}
            {/*      fill="currentColor"*/}
            {/*    />*/}
            {/*  </svg>*/}
            {/*  Login with Github*/}
            {/*</Button>*/}
            <Button
              className="w-full"
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
