'use client';

import { HTMLAttributes, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { authSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { apiUrls } from '@/lib/apiUrls';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import url from '@/constants/url';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Database } from '@/lib/database.types';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof authSchema>;

export function AuthForm({ className, ...props }: UserAuthFormProps) {
	const pathname = usePathname();
	const form = useForm<FormData>({
		resolver: zodResolver(authSchema),
		mode: 'onSubmit',
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty },
	} = form;

	const supabase = createClientComponentClient<Database>();
	const router = useRouter();

	useEffect(() => {
		// inputElement.current?.focus();

		async function getUser() {
			const { data } = await supabase.auth.getUser();
			const { user } = data;
			if (user) {
				router.push(url.app.overview);
			}
		}

		getUser();
	}, [router, supabase.auth]);

	const authApiUrl =
		pathname === '/login' ? apiUrls.auth.login : apiUrls.auth.register;

	async function onSubmit(data: FormData) {
		try {
			const { data: response, error } = await supabase.auth.signInWithOtp({
				email: data.email,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`,
				},
			});

			const res = await fetch(authApiUrl, {
				method: 'POST',
				body: JSON.stringify({ email: data.email }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (error) {
				toast({
					title: 'Authentication Failure',
					description: error.message,
					variant: 'destructive',
				});
				throw new Error(error.message);
			}

			return toast({
				title: 'Check your email',
				description:
					'We sent you a login link. Be sure to check your spam too.',
			});
		} catch (error: any) {
			toast({
				title: 'Authentication Failure',
				description: error.message,
				variant: 'destructive',
			});
		}
	}

	return (
		<Form {...form}>
			<div className={cn('grid gap-6', className)} {...props}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='sr-only'>Email</FormLabel>
								<FormControl>
									<Input
										autoFocus
										placeholder='panic@thedis.co'
										type='email'
										autoCapitalize='none'
										autoComplete='email'
										autoCorrect='off'
										disabled={isSubmitting}
										{...field}
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						size='lg'
						className='w-full uppercase'
						type='submit'
						disabled={isSubmitting || !isDirty || !isValid}
					>
						{isSubmitting && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						{pathname === '/login' ? 'Send magic link' : 'Sign up here'}
					</Button>
				</form>
			</div>
		</Form>
	);
}
