import "@/styles/globals.css";
import { OpenStatusProvider } from "@openstatus/next-monitoring";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Providers } from "@/app/[locale]/providers";
import { fontMono, fontSans } from "@/app/fonts";
import { constructMetadata } from "@/lib/construct-metadata";
import { cn } from "@/lib/utils";

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
      <html
        className={cn(
          "isolate min-h-dvh touch-manipulation overscroll-none whitespace-pre-line bg-background font-sans text-foreground antialiased",
          fontSans.variable,
          fontMono.variable
        )}
        data-scroll-behavior="smooth"
        lang="en"
        suppressHydrationWarning
      >
        <Script
          async
          data-token={process.env.NEXT_PUBLIC_SELINE_CLIENT_ID as string}
          src="https://cdn.seline.so/seline.js"
          strategy="afterInteractive"
        />
        <body className="flex min-h-screen max-w-screen flex-col">
          <Providers locale={locale}>{await children}</Providers>
          <Analytics />
          <SpeedInsights />
          <OpenStatusProvider dsn="plutus" />
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
