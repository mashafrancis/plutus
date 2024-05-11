import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface LoginButtonProps {
  isLoading: boolean
}

export default function LoginButton({ isLoading }: LoginButtonProps) {
  return (
    <form
      action="/auth/sign-in"
      method="post"
      className="flex flex-col items-center"
    >
      <Button variant="outline" size="lg" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Sign in with google
      </Button>
    </form>
  )
}
