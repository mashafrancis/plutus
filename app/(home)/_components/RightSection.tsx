import { ArrowIcon, Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RightSection() {
	return (
		<div className='absolute left-[159px] top-[30px] h-screen w-48 md:hidden'>
			<div className='absolute left-0 top-0 h-14 w-48'>
				<div className='absolute left-0 top-0 text-2xl font-bold text-gray-900'>
					06:20 PM
				</div>
				<div className='absolute left-0 top-[40px] text-xs font-medium leading-tight text-slate-500'>
					Nov.10.2020 | Wednesday
				</div>
				<div className='absolute left-[153px] top-[5px] text-xs font-semibold leading-tight text-gray-900'>
					34° C
				</div>
			</div>
			<div className='absolute left-0 top-[625px] h-12 w-48'>
				<Link href='/login'>
					<Button className='mt-6 h-12 w-48 rounded-lg' size='lg'>
						Login
						<ArrowIcon direction='right' />
					</Button>
				</Link>
			</div>
			<div className='absolute left-0 top-[246px] h-52 w-48'>
				<div className='absolute left-0 top-[57.60px] h-40 w-48'>
					<div className='absolute left-0 top-[48px] w-48 text-sm font-medium leading-snug text-slate-500'>
						Track and manage your expenses with ease. <br />
						<br />
						Join For Free.
					</div>
					<h4 className='absolute left-0 top-0 text-3xl font-bold text-gray-900'>
						Plutus
					</h4>
				</div>
				<div className='absolute left-0 top-0 h-10 w-16'>
					<Icons.logo className='mx-auto h-14 w-14' />
				</div>
			</div>
		</div>
	);
}
