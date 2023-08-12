import { ArrowIcon, Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import RightSection from '@/app/(home)/_components/RightSection';
import Link from 'next/link';
import heroStyles from '@/styles/hero.module.css';

export default function MarketingPage() {
	return (
		<div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='hidden h-full bg-slate-100 lg:block' />
			<div
				// className='absolute left-0 top-0 flex bg-repeat-y md:hidden'
				className={heroStyles.main}
			/>
			<RightSection />
			<div className='hidden md:block lg:p-8'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6'>
					<div className='flex flex-col items-center text-center'>
						<Icons.logo className='mx-auto h-14 w-14' />
						<h1 className='text-3xl font-bold'>Plutus</h1>
						<h4 className='my-6 text-slate-500 dark:text-slate-400'>
							Track and manage your expenses with ease.
						</h4>

						<Link href='/login'>
							<Button className='mt-6 h-12 w-48 rounded-lg' size='lg'>
								Login
								<ArrowIcon direction='right' />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
