import { type Metadata } from 'next';
import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import AuthUI from '@/app/login/auth-ui';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account',
};

export default async function LoginIn() {
	const session = await getSession();

	if (session) {
		return redirect('/account');
	}

	return (
		<div className='flex justify-center'>
			<div className='m-auto flex w-80 max-w-lg flex-col justify-between p-3 '>
				{/*<div className="flex justify-center pb-12 ">*/}
				{/*	<Logo width="64px" height="64px" />*/}
				{/*</div>*/}
				<AuthUI />
			</div>
		</div>
	);
}
