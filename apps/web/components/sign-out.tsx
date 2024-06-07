'use client'

import { signOutAction } from '@/actions/sign-out-action'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export function SignOut() {
  const [isLoading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading((prevState) => !prevState)
    await signOutAction()
    setLoading((prevState) => !prevState)
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? 'Loading...' : 'Sign out'}
    </DropdownMenuItem>
  )
}
