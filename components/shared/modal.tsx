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
      <DialogContent className="overflow-hidden p-0 md:max-w-md md:rounded-2xl md:border">
        {children}
      </DialogContent>
    </Dialog>
  )
}
