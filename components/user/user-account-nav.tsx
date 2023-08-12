'use client';

import ThemeSwitch from '@/components/theme-switch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user/user-avatar';
import { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/app/supabase-provider';

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
	user: any;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	const router = useRouter();
	const { supabase } = useSupabase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					className='h-8 w-8 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600'
					user={user}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='space-y-1.5 p-2'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && (
							<p className='w-[200px] truncate text-sm text-muted-foreground'>
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />

				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-row items-center justify-between space-y-1'>
						<span>Theme</span>
						<ThemeSwitch />
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer text-foreground/60'
					onSelect={async () => {
						await supabase.auth.signOut();
						router.push('/login');
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}