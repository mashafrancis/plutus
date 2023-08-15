'use client';

import { SidebarNavItem } from '@/types';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
	items: SidebarNavItem[];
}

export default function BottomNavigation({ items }: Props) {
	const pathname = usePathname();

	return (
		<div className='block w-full md:hidden'>
			<section
				id='bottom-navigation'
				className='fixed inset-x-0 bottom-0 z-10 block bg-white px-2 shadow'
			>
				<div id='tabs' className='flex justify-between'>
					{items.map(({ id, href, disabled, title, icon }, index) => {
						const Icon = Icons[icon || 'arrowRight'];
						return (
							href && (
								<Link
									key={id}
									href={disabled ? '/' : href}
									className={cn(
										'my-2 inline-block justify-center text-center font-medium transition-colors hover:text-foreground/80',
										pathname === href
											? 'text-foreground'
											: 'text-foreground/60',
										disabled && 'cursor-not-allowed opacity-80'
									)}
								>
									<Button
										aria-label={title}
										disabled={disabled}
										variant='ghost'
										size='icon'
										className={cn(
											pathname === href
												? 'bg-primary/20 hover:bg-primary/20 hover:text-primary'
												: 'text-gray-500',
											'h-8 w-14 rounded-full p-0 font-medium ring-primary/50 transition-all hover:bg-primary/10 hover:ring-1 disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:opacity-80'
										)}
									>
										<Icon className='h-5 w-5' />
									</Button>
									{/*<span className='text-xs'>{title}</span>*/}
								</Link>
							)
						);
					})}
				</div>
			</section>
		</div>
	);
}
