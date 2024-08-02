'use client'

import { Button } from '@/components/ui/button'
import { useSignInModal } from '@/store/use-sign-in-modal'

export default function GetStartedButton() {
  const { onOpen } = useSignInModal()

  return (
    <Button onClick={onOpen} size="large" type="primary">
      Try it for free
    </Button>
  )
}
