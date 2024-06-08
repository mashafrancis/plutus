'use client'

import { ReactNode } from 'react'

import { ThemeProvider } from '@/components/client-provider/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

// import posthog from 'posthog-js'
// import { PostHogProvider } from 'posthog-js/react'
//
// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//   })
// }

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
