"use client";

import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProviderClient } from "@/locales/client";
import { TRPCReactProvider } from "@/trpc/react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  locale: string;
  children: ReactNode;
}

export function Providers({ children, locale }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <TRPCReactProvider>
              <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
            </TRPCReactProvider>
          </motion.div>
        </ThemeProvider>
      </AnimatePresence>
    </I18nProviderClient>
  );
}
