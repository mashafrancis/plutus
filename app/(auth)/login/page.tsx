import { type Metadata } from 'next';
import Link from 'next/link';

import { BackLink } from '@/components/arrow-button';
import { Icons } from '@/components/icons';
import Messages from './messages';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account',
};

export default function LoginPage() {
	return (
		<div className='container flex h-screen w-screen flex-col items-center justify-center'>
			<BackLink className='absolute left-4 top-4 md:left-8 md:top-8' to='/'>
				Back to Home
			</BackLink>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<Icons.logo className='mx-auto h-14 w-14' />
					<h1 className='text-2xl font-semibold'>Welcome back</h1>
					<p className='text-slate-500 dark:text-slate-400'>
						Enter your email to sign in to your account
					</p>
				</div>
				<form
					className='flex w-full flex-1 flex-col justify-center gap-2 text-foreground'
					action='/auth/sign-in'
					method='post'
				>
					<label className='text-md' htmlFor='email'>
						Email
					</label>
					<input
						className='mb-6 rounded-md border bg-inherit px-4 py-2'
						name='email'
						placeholder='you@example.com'
						required
					/>
					<label className='text-md' htmlFor='password'>
						Password
					</label>
					<input
						className='mb-6 rounded-md border bg-inherit px-4 py-2'
						type='password'
						name='password'
						placeholder='••••••••'
						required
					/>
					<button className='mb-2 rounded bg-green-700 px-4 py-2 text-white'>
						Sign In
					</button>
					<button
						formAction='/auth/sign-up'
						className='mb-2 rounded border border-gray-700 px-4 py-2 text-black'
					>
						Sign Up
					</button>
					<Messages />
				</form>
				<p className='px-8 text-center text-sm text-slate-500 dark:text-slate-400'>
					<Link
						href='/register'
						className='hover:text-brand underline underline-offset-4'
					>
						Don&apos;t have an account? Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
