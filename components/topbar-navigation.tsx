import Link from 'next/link';
import { MainNavItem } from '@/types';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import MobileNav from '@/components/mobile-nav';
import { Nav } from '@/components/nav';
import LogoutButton from '@/components/logout-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface Props {
	items: MainNavItem[];
	navContainedWidth?: boolean;
	showLogo?: boolean;
}

const TopBarNavigation = async ({
	items,
	showLogo = true,
	navContainedWidth,
}: Props) => {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<header className='sticky top-0 z-40 bg-background'>
			<div className='flex h-14 items-center justify-between gap-6 border-b py-4 md:gap-10'>
				{items?.length ? (
					<nav
						className={cn(
							navContainedWidth && 'container lg:px-0',
							'inset-x-0 top-0 z-10 w-full p-4 lg:sticky lg:p-2 lg:px-4'
						)}
					>
						<div className='col-span-full flex items-center justify-between lg:col-span-8 lg:col-start-3'>
							<MobileNav items={items} />

							{showLogo ? (
								<Link href='/' className='hidden items-center md:flex'>
									<Icons.logo />
								</Link>
							) : (
								<div></div>
							)}

							<div className='ml-[-0.60rem] lg:flex lg:items-center lg:justify-center'>
								<Nav items={items} />
							</div>

							<div className='flex items-center gap-3 text-base leading-5'>
								{user ? (
									<div className='flex items-center gap-4'>
										Hey, {user.email}!
										<LogoutButton />
									</div>
								) : (
									<Link
										href='/login'
										className={cn(
											buttonVariants({ variant: 'ghost', size: 'sm' }),
											'px-4'
										)}
									>
										Login
									</Link>
								)}
							</div>
						</div>
					</nav>
				) : null}
			</div>
		</header>
	);
};

export default TopBarNavigation;
