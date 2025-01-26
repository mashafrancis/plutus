import { SignOut } from '@/components/sign-out'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getInitials } from '@/lib/formatter'
import { getUser } from '@plutus/supabase/cached-queries'

export async function UserMenu() {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="outline"
            icon={
              <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted text-xs font-medium uppercase text-foreground-lighter">
                {getInitials((user?.data?.email as string) || 'Anonymous')}
              </div>
            }
          >
            <span className="ml-2 hidden md:block">
              {user?.data?.email as string}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs text-zinc-500">
              {user?.data?.email as string}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
