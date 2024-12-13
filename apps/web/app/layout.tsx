import { cn } from '@/lib/utils'
import { type ReactNode, Suspense } from 'react'
import '@/styles/globals.css'
import '@/styles/overwrites.css'
import '@/styles/date-picker.css'
import { Toaster } from '@/components/ui/sonner'
import { constructMetadata } from '@/lib/construct-metadata'
import { fontSans } from '@/lib/fonts'
import { Provider as OpenPanelAnalytics } from '@plutus/events/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'

export const metadata = constructMetadata()

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        async
        src="https://cdn.seline.so/seline.js"
        data-token="82a54f4e6018731"
        strategy="afterInteractive"
      />
      <body
        className={cn(
          'min-[100dvh] overscroll-none whitespace-pre-line font-sans !bg-alternative antialiased',
          fontSans.variable,
          GeistMono.variable,
        )}
      >
        {children}
        <OpenPanelAnalytics />
        <Analytics />
        <SpeedInsights />
        <Suspense fallback={null}>
          <Toaster
            className="font-sans font-normal"
            position="bottom-right"
            richColors
          />
        </Suspense>
      </body>
    </html>
  )
}
