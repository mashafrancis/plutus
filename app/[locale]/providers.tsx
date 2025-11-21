"use client";

import { OpenPanelComponent } from "@openpanel/nextjs";
// import { Databuddy } from "@databuddy/sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/react";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProviderClient } from "@/locales/client";
import { ModalProvider } from "@/modals";
import { TRPCReactProvider } from "@/trpc/react";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

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
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <TRPCReactProvider>
              <NuqsAdapter>
                <ModalProvider />
                <OpenPanelComponent
                  clientId={
                    process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID as string
                  }
                  trackAttributes
                  trackHashChanges
                  trackOutgoingLinks
                  trackScreenViews
                />
                {/*<Databuddy*/}
                {/*  clientId={*/}
                {/*    process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID as string*/}
                {/*  }*/}
                {/*  enableBatching={true}*/}
                {/*  trackAttributes={true}*/}
                {/*  trackBounceRate={true}*/}
                {/*  trackEngagement={true}*/}
                {/*  trackErrors={true}*/}
                {/*  trackExitIntent={true}*/}
                {/*  trackHashChanges={true}*/}
                {/*  trackInteractions={true}*/}
                {/*  trackOutgoingLinks={true}*/}
                {/*  trackScrollDepth={true}*/}
                {/*  trackWebVitals={true}*/}
                {/*/>*/}
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
