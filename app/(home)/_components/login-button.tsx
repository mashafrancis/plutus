'use client';

import { ArrowIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export default function LoginButton() {
	const supabase = createClientComponentClient<Database>();

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
				redirectTo: `${window.location.origin}/app`,
			},
		});
	};

	return (
		<Button className='mt-6' size='lg' onClick={handleSignIn}>
			Login
			<ArrowIcon direction='right' />
		</Button>
	);
}
