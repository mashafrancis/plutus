import '@/styles/globals.css';
import { ClientProvider } from '@/components/client-provider';
import { fontHeading, fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

export const dynamic = 'force-dynamic';

export const metadata = {
	title: 'Plutus',
	description: 'Organize your finances like never before.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang='en'
			className={cn(
				'min-h-screen bg-background font-sans text-black',
				fontSans.variable,
				fontHeading.variable,
				fontMono.variable
			)}
		>
			<body className='antialiased'>
				<ClientProvider>
					{children}
					<Toaster />
				</ClientProvider>
			</body>
		</html>
	);
}
