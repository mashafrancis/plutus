import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// export const fontSans = localFont({
// 	src: [
// 		{
// 			path: '../assets/fonts/CircularSpotifyText-Light.woff2',
// 			weight: '400',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../assets/fonts/CircularSpotifyText-Book.woff2',
// 			weight: '500',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../assets/fonts/CircularSpotifyText-Book.woff2',
// 			weight: '700',
// 			style: 'normal',
// 		},
// 	],
// 	variable: '--font-sans',
// 	display: 'swap',
// });

// export const fontSans = Inter({
// 	variable: '--font-sans',
// 	subsets: ['latin'],
// });

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
