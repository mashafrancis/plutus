'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import ErrorBoundaryPage from '@/components/error-boundary-page';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/client-provider/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function ClientProvider({ children }: { children: ReactNode }) {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryPage}
			onReset={() => window.location.replace('/')}
		>
			<ThemeProvider attribute='class' defaultTheme={'light'} enableSystem>
				<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
}
