import { Metadata } from 'next';

import { ReactNode } from 'react';

import { ClientProvider } from '@/components/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { fontHeading, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import '@/styles/overwrites.css';
import Loglib from '@loglib/tracker/react';

export const dynamic = 'force-dynamic';

const title = 'Plutus';
const description = 'Organize your finances like never before.';

export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s | ${title}`,
	},
	description,
	manifest: 'https://plutus.francismasha.com/manifest.json',
	keywords: [
		'Finance Analytics',
		'Open Source finance analytics',
		'plutus',
		'plutus analytics',
	],
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
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
			suppressHydrationWarning
			className={cn(
				'min-h-screen font-sans text-black',
				fontSans.variable,
				fontHeading.variable
			)}
		>
			<body className='antialiased'>
				<ClientProvider>
					{children}
					<Toaster />
					<Loglib
						config={{
							id: 'plutus',
							consent: 'granted',
						}}
					/>
				</ClientProvider>
			</body>
		</html>
	);
}
