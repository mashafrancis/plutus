import { ArrowIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
	return (
		<form action='/auth/sign-in' method='post'>
			<Button className='mt-6' size='lg'>
				Sign in with Google
				<ArrowIcon direction='right' />
			</Button>
		</form>
	);
}
