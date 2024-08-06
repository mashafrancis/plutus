'use client'

import { type ReactNode } from 'react'

import { ThemeProvider } from '@/components/client-provider/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nProviderClient } from '@/locales/client'

interface ProviderProps {
  locale: string
  children: ReactNode
}

export function ClientProvider({ children, locale }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </ThemeProvider>
    </I18nProviderClient>
  )
}
