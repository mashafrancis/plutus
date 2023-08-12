import { Avatar } from '@/components/ui/avatar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function UserAvatar() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<Avatar className='inline-flex h-8 w-8 items-center justify-center bg-primary'>
			<span className='text-sm uppercase text-white'>
				{user?.email?.charAt(0)}
			</span>
		</Avatar>
	);
}
