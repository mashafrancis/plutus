'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/react';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProviderClient } from '@/locales/client';
import { TRPCReactProvider } from '@/trpc/react';

interface ProviderProps {
  locale: string;
  children: ReactNode;
}

export function Providers({ children, locale }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            initial={{ x: 300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <TRPCReactProvider>
              <NuqsAdapter>
                <TooltipProvider delayDuration={100}>
                  {children}
                </TooltipProvider>
              </NuqsAdapter>
            </TRPCReactProvider>
          </motion.div>
        </ThemeProvider>
      </AnimatePresence>
    </I18nProviderClient>
  );
}
