'use client'

import { Button } from '@/components/ui/button'
import { pushModal } from '@/modals'

export default function GetStartedButton() {
  return (
    <Button
      onClick={() => {
        pushModal('loginDetails')
      }}
      size="large"
      type="primary"
    >
      Try it for free
    </Button>
  )
}
