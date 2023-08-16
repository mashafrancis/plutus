import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { appConfig } from '@/config/dashboard';
import AppNav from '@/components/app-nav';
import { getCurrentUser, getSession } from '@/app/supabase-server';
import BottomNavigation from '@/components/bottom-navigation';
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider';
import { AuthProvider } from '@/components/client-provider/auth-provider';

interface DashboardLayoutProps {
	children?: ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const [user, session] = await Promise.all([getCurrentUser(), getSession()]);

	if (!user) {
		return notFound();
	}

	return (
		<AuthProvider user={user} accessToken={session?.access_token || null}>
			<DatePickerProvider>
				<div className='flex min-h-screen flex-col space-y-6 bg-muted'>
					<div className='flex h-full'>
						<div className='z-30 hidden h-screen w-24 flex-col justify-between overflow-y-hidden border-r bg-background p-2 md:flex'>
							<AppNav items={appConfig.sidebarNav} user={user} />
						</div>
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
