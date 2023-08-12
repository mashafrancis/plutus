'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { heimdallImages } from '@/lib/images';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Hero() {
	return (
		<HeroSection
			title='API Monitoring.'
			subtitle="Unlock insights into your API's performance with global monitoring and analysis."
			imageBuilder={heimdallImages.home}
			imageSize='large'
			// arrowUrl='#blog'
			// arrowLabel='Check trending articles'
			action={
				<div className='mr-auto flex flex-col gap-4'>
					<div className='flex gap-4'>
						<Link
							href={'/login'}
							className={cn(
								buttonVariants({
									size: 'lg',
								})
							)}
						>
							{'Get Started'}
						</Link>
						{/*<Link*/}
						{/*	href={user ? '/dashboard' : '/login'}*/}
						{/*	className={cn(*/}
						{/*		buttonVariants({*/}
						{/*			variant: 'outline',*/}
						{/*			size: 'lg',*/}
						{/*		})*/}
						{/*	)}*/}
						{/*>*/}
						{/*	{user ? 'Go to dashboard' : 'Sign In'}*/}
						{/*</Link>*/}
					</div>
				</div>
			}
		/>
	);
}
