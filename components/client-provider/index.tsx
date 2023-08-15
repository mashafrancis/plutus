'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import ErrorBoundaryPage from '@/components/error-boundary-page';
import fetcher from '@/lib/fetcher';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@/components/client-provider/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function ClientProvider({ children }: { children: ReactNode }) {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryPage}
			onReset={() => window.location.replace('/')}
		>
			<ThemeProvider attribute='class' defaultTheme={'light'} enableSystem>
				<SWRConfig
					value={{
						refreshInterval: 5000,
						fetcher,
					}}
				>
					<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
				</SWRConfig>
			</ThemeProvider>
		</ErrorBoundary>
	);
}
