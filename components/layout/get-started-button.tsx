'use client'

import { Button } from '@/components/ui-elements/button'
import { useSignInModal } from '@/hooks/use-sign-in-modal'

export default function GetStartedButton() {
  const { onOpen } = useSignInModal()

  return (
    <Button onClick={onOpen} size="large" type="primary">
      Try it for free
    </Button>
  )
}
