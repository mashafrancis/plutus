import { Icons } from '@/components/icons'
import { Button } from '@/components/ui-elements/button'

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
      <Button
        type="outline"
        size="large"
        disabled={isLoading}
        htmlType="submit"
        icon={<Icons.google className="mr-2 h-4 w-4" />}
      >
        Sign in with google
      </Button>
    </form>
  )
}
