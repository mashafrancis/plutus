'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	// When mounted on a client, now we can show the UI
	useEffect(() => setMounted(true), []);

	const ThemeSwitch = () => {
		setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	const selectedTheme = {
		light: 'bg-gray-200 text-gray-800',
		dark: 'bg-gray-800 text-gray-200',
		system:
			theme === 'light'
				? 'bg-gray-200 text-gray-800'
				: 'bg-gray-800 text-gray-200',
	};

	return (
		<div className='flex w-fit rounded-full border p-[3px]' role='radiogroup'>
			<button
				aria-checked={theme === 'light' ? 'true' : 'false'}
				aria-label='Switch to light theme'
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:text-gray-800 hover:dark:text-gray-200',
					theme === 'light' && selectedTheme.light
				)}
				role='radio'
				type='button'
				onClick={() => setTheme('light')}
			>
				<svg
					data-testid='geist-icon'
					fill='none'
					height='16'
					shapeRendering='geometricPrecision'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
					viewBox='0 0 24 24'
					width='16'
					// style='color: currentcolor;'
				>
					<circle cx='12' cy='12' r='5'></circle>
					<path d='M12 1v2'></path>
					<path d='M12 21v2'></path>
					<path d='M4.22 4.22l1.42 1.42'></path>
					<path d='M18.36 18.36l1.42 1.42'></path>
					<path d='M1 12h2'></path>
					<path d='M21 12h2'></path>
					<path d='M4.22 19.78l1.42-1.42'></path>
					<path d='M18.36 5.64l1.42-1.42'></path>
				</svg>
			</button>
			<button
				aria-checked={theme === 'system' ? 'true' : 'false'}
				aria-label='Switch to system theme'
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:text-gray-800 hover:dark:text-gray-200',
					theme === 'system' && selectedTheme.system
				)}
				role='radio'
				type='button'
				onClick={() => setTheme('system')}
			>
				<svg
					data-testid='geist-icon'
					fill='none'
					height='16'
					shapeRendering='geometricPrecision'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
					viewBox='0 0 24 24'
					width='16'
					// style='color: currentcolor;'
				>
					<rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect>
					<path d='M8 21h8'></path>
					<path d='M12 17v4'></path>
				</svg>
			</button>
			<button
				aria-checked={theme === 'dark' ? 'true' : 'false'}
				aria-label='Switch to dark theme'
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:text-gray-800 hover:dark:text-gray-200',
					theme === 'dark' && selectedTheme.dark
				)}
				role='radio'
				type='button'
				onClick={() => setTheme('dark')}
			>
				<svg
					data-testid='geist-icon'
					fill='none'
					height='16'
					shapeRendering='geometricPrecision'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='1.5'
					viewBox='0 0 24 24'
					width='16'
					// style='color: currentcolor;'
				>
					<path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'></path>
				</svg>
			</button>
		</div>
	);
};

export default ThemeSwitch;
