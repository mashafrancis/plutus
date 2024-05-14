import { Metadata } from 'next'

import { ReactNode, Suspense } from 'react'

import { ClientProvider } from '@/components/client-provider'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import '@/styles/overwrites.css'
import '@/styles/date-picker.css'
import { ModalProvider } from '@/components/client-provider/modal-provider'
import { Toaster } from '@/components/ui-elements/sonner'
import { env } from '@/env.mjs'
import { BaselimeRum } from '@baselime/react-rum'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'

const title = 'Plutus'
const description = 'Organize your finances like never before.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  manifest: 'https://plutus.francismasha.com/manifest.json',
  keywords: [
    'Finance Analytics',
    'Open Source finance analytics',
    'plutus',
    'plutus analytics',
  ],
  icons: {
    icon: 'https://plutus.francismasha.com/logo.svg',
    shortcut: 'https://plutus.francismasha.com/favicon.ico',
    apple: 'https://plutus.francismasha.com/apple-touch-icon.png',
  },
  appleWebApp: {
    title,
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: ['https://plutus.francismasha.com/apple-touch-icon.png'],
  },
}

const baselimeApiKey = env.NEXT_PUBLIC_BASELIME_KEY

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-[100dvh] overscroll-none whitespace-pre-line font-sans !bg-alternative antialiased',
          fontSans.variable,
          GeistMono.variable,
        )}
      >
        <BaselimeRum
          apiKey={baselimeApiKey}
          enableWebVitals
          // fallback={<ErrorPage />}
        >
          <ClientProvider>
            {children}
            <ModalProvider />
            <Suspense fallback={null}>
              <Toaster
                className="font-sans font-normal"
                position="bottom-right"
                richColors
              />
            </Suspense>
          </ClientProvider>
        </BaselimeRum>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
