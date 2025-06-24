import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from '@/app/[locale]/providers';
import { fontMono, fontSans } from '@/app/fonts';
import { constructMetadata } from '@/lib/construct-metadata';
import { cn } from '@/lib/utils';

export const metadata = constructMetadata();

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const _geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const _geist_mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <Script
          async
          data-token="82a54f4e6018731"
          src="https://cdn.seline.so/seline.js"
          strategy="afterInteractive"
        />
        <body
          className={cn(
            'min-[100dvh] overscroll-none scroll-smooth whitespace-pre-line bg-alternative! font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers locale={locale}>{await children}</Providers>
          {/*<OpenPanelAnalytics/>*/}
          <Analytics />
          <SpeedInsights />
          <Toaster
            className="font-normal font-sans"
            position="bottom-right"
            richColors
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
