import { SignOut } from '@/components/sign-out'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUser } from '@plutus/supabase/cached-queries'

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName?.[0]}${lastName[0]}` : firstName?.slice(0, 2)
}

export async function UserMenu() {
  const user = await getUser()
  console.log('Class: UserMenu, Function: UserMenu, Line 19 user():', user)

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(user?.data?.email as string)}
            </div>
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
