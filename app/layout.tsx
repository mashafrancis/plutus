import '@/styles/globals.css';
import { ClientProvider } from '@/components/client-provider';
import { fontHeading, fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const title = 'Plutus';
const description = 'Organize your finances like never before.';

export const metadata: Metadata = {
	title,
	description,
	manifest: 'https://plutus.francismasha.com/manifest.json',
	themeColor: '#ffffff',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		userScalable: false,
	},
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
};

export const revalidate = 0;

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
