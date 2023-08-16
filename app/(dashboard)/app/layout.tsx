import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { appConfig } from '@/config/dashboard';
import AppNav from '@/components/app-nav';
import { getSession } from '@/app/supabase-server';
import BottomNavigation from '@/components/bottom-navigation';
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider';
import { AuthProvider } from '@/components/client-provider/auth-provider';
import url from '@/constants/url';
import { apiUrls } from '@/lib/apiUrls';
import { cookies } from 'next/headers';

interface DashboardLayoutProps {
	children?: ReactNode;
}

async function getUser(cookies: any) {
	'use server';
	const res = await fetch(`${url.serverApi}/${apiUrls.user.modify}`, {
		headers: { cookie: cookies },
	});
	if (!res.ok) {
		return {};
	}
	return await res.json();
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const session = await getSession();
	const user = await getUser(cookies());

	if (!session) {
		return notFound();
	}

	return (
		<AuthProvider user={user} accessToken={session?.access_token || null}>
			<DatePickerProvider>
				<div className='flex min-h-screen flex-col space-y-6 bg-muted'>
					<div className='flex h-full'>
						<AppNav items={appConfig.sidebarNav} user={session.user} />
						<main className='mb-16 flex w-full flex-1 flex-col overflow-hidden'>
							<div className='container my-2 grid flex-1 md:my-8'>
								<div className='flex h-full flex-1 flex-col space-y-4 p-1'>
									{children}
								</div>
							</div>
							<BottomNavigation items={appConfig.sidebarNav} />
						</main>
					</div>
				</div>
			</DatePickerProvider>
		</AuthProvider>
	);
}