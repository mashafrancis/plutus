import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { appConfig } from '@/config/dashboard';
import AppNav from '@/components/app-nav';
import { getCurrentUser } from '@/app/supabase-server';

interface DashboardLayoutProps {
	children?: ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const user = await getCurrentUser();

	if (!user) {
		return notFound();
	}

	return (
		<div className='flex min-h-screen flex-col bg-[#F1F3F6] dark:bg-[#212330]'>
			<div className='flex h-full'>
				<div className='z-50 hidden h-screen w-14 flex-col justify-between overflow-y-hidden border-r bg-background p-2 md:flex'>
					<AppNav items={appConfig.sidebarNav} user={user} />
				</div>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					{/*<TopBarNavigation items={dashboardConfig.mainNav} user={user} />*/}
					<div className='container'>{children}</div>
				</main>
			</div>
		</div>
	);
}
