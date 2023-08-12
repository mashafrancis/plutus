import { ReactNode } from 'react';
import { marketingConfig } from '@/config/marketing';
import { SiteFooter } from '@/components/site-footer';
import TopBarNavigation from '@/components/topbar-navigation';

export const dynamic = 'force-dynamic';

interface MarketingLayoutProps {
	children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col'>
			<TopBarNavigation navContainedWidth items={marketingConfig.mainNav} />
			<main className='flex-1'>{children}</main>
			<SiteFooter className='z-40 border-t bg-background' />
		</div>
	);
}
