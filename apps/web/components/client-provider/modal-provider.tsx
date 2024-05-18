'use client'

import { SignInModal } from '@/components/modal/sign-in'
import { useMounted } from '@/hooks/use-mounted'

export const ModalProvider = () => {
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  return (
    <>
      <SignInModal />
      {/* add your own modals here... */}
    </>
  )
}
