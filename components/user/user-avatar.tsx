import { Avatar } from '@/components/ui/avatar';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
	user: any;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	const userInitials = user?.name ?? 'SA';
	return (
		<Avatar
			{...props}
			className='inline-flex h-8 w-8 items-center justify-center bg-primary text-white transition-colors'
		>
			<span className='text-sm uppercase text-primary-foreground'>
				{userInitials.length > 2
					? userInitials.split('').slice(0, 2)
					: userInitials}
			</span>
		</Avatar>
	);
}
