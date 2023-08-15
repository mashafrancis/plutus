'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { UserAccountNav } from '@/components/user/user-account-nav';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface DashboardNavProps {
	items: SidebarNavItem[];
	user: any;
}

export default function AppNav({ items, user }: DashboardNavProps) {
	const pathname = usePathname();

	if (!items?.length) {
		return null;
	}

	return (
		<Fragment>
			<ul className='flex flex-col space-y-4'>
				<Link href='/' className='hidden items-center md:flex'>
					<Icons.logo />
				</Link>
				{items.map(({ id, href, disabled, title, icon }, index) => {
					const Icon = Icons[icon || 'arrowRight'];
					return (
						href && (
							<Tooltip key={id}>
								<TooltipTrigger asChild>
									<Link
										href={disabled ? '/' : href}
										className={cn(
											'flex items-center font-medium transition-colors hover:text-foreground/80',
											pathname === href
												? 'text-foreground'
												: 'text-foreground/60',
											disabled && 'cursor-not-allowed opacity-80'
										)}
									>
										<Button
											aria-label={title}
											variant='ghost'
											className='h-10 w-10 rounded-md p-0 ring-gray-300 transition-all hover:ring-1 dark:bg-gray-600'
										>
											<Icon className='h-5 w-5 text-gray-600' />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent asChild side='right' align='start'>
									<span>{title}</span>
								</TooltipContent>
							</Tooltip>
						)
					);
				})}
			</ul>
			<ul className='flex flex-col space-y-2'>
				<UserAccountNav
					user={{
						name: user?.user_metadata?.name || 'noname',
						image:
							user?.user_metadata?.avatar_url || '/static/icons/avatar.svg',
						email: user?.user_metadata?.email,
					}}
				/>
			</ul>
		</Fragment>
	);
}
