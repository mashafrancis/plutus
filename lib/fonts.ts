import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local'; // export const fontSans = localFont({

export const fontSans = localFont({
	src: '../assets/fonts/sf-pro-text-regular.woff2',
	weight: '500',
	variable: '--font-sans',
	display: 'swap',
});

// Font files can be collocated inside `pages`
export const fontHeading = localFont({
	src: '../assets/fonts/CalSans-SemiBold.woff2',
	variable: '--font-heading',
});

export const fontMono = JetBrains_Mono({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-jetbrains',
});
