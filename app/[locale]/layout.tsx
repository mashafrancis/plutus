import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Providers } from "@/app/[locale]/providers";
import { constructMetadata } from "@/lib/construct-metadata";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata = constructMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geist_mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
          src="https://cdn.seline.so/seline.js"
          data-token="82a54f4e6018731"
          strategy="afterInteractive"
        />
        <body
          className={cn(
            "min-[100dvh] overscroll-none scroll-smooth whitespace-pre-line bg-alternative! font-sans antialiased",
            geist.variable,
            geist_mono.variable,
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
