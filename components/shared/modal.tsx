'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerPortal } from '@/components/ui/drawer'
import useMediaQuery from '@/hooks/use-media-query'

interface ModalProps {
  children: React.ReactNode
  className?: string
  showModal: boolean
  setShowModal: () => void
}

export function Modal({ children, showModal, setShowModal }: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer open={showModal} onClose={setShowModal}>
        <DrawerPortal>
          <DrawerContent>{children}</DrawerContent>
        </DrawerPortal>
      </Drawer>
    )
  }
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  )
}
