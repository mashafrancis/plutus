'use client'

import { ReactNode } from 'react'

import { ThemeProvider } from '@/components/client-provider/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={'light'} enableSystem>
      <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
