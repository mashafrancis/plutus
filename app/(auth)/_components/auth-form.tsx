'use client';

import { HTMLAttributes, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { authSchema } from '@/lib/validations/auth';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { apiUrls } from '@/lib/apiUrls';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import url from '@/constants/url';
import { Form } from '@/components/ui/form';
import { Database } from '@/lib/database.types';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof authSchema>;

export function AuthForm({ className, ...props }: UserAuthFormProps) {
	const pathname = usePathname();
	const form = useForm<FormData>({
		resolver: zodResolver(authSchema),
		mode: 'onChange',
	});

	const {
		register,
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
			// await supabase.auth.signIn({ email: data.email });

			const res = await fetch(authApiUrl, {
				method: 'POST',
				body: JSON.stringify({ email: data.email }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!res.ok) {
				const error = await res.json();
				toast({
					title: 'Authentication Failure',
					description: error.statusText,
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
				description: error.statusText,
				variant: 'destructive',
			});
		}
	}

	return (
		<Form {...form}>
			<div className={cn('grid gap-6', className)} {...props}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<Label className='sr-only' htmlFor='email'>
								Email
							</Label>
							<Input
								id='email'
								placeholder='name@example.com'
								type='email'
								autoCapitalize='none'
								autoComplete='email'
								autoCorrect='off'
								disabled={isSubmitting}
								{...register('email')}
							/>
							{errors?.email && (
								<p className='px-1 text-red-600'>{errors.email.message}</p>
							)}
						</div>
						<button
							className={cn(buttonVariants())}
							disabled={isSubmitting || !isDirty || !isValid}
						>
							{isSubmitting && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							Sign In with Email
						</button>
					</div>
				</form>
			</div>
		</Form>
	);
}
