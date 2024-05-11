'use client'

import { Button } from '@/components/ui/button'
import { useSignInModal } from '@/hooks/use-sign-in-modal'

export default function GetStartedButton() {
  const { onOpen } = useSignInModal()

  return <Button onClick={onOpen}>Try it for free</Button>
}
