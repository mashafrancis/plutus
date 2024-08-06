'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { Drawer } from 'vaul'

interface ModalProps {
  children: React.ReactNode
  className?: string
  showModal: boolean
  setShowModal: () => void
}

export function Modal({
  children,
  showModal,
  setShowModal,
  className,
}: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer.Root
        open={showModal}
        onClose={setShowModal}
        shouldScaleBackground
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className={cn(
              'fixed inset-x-0 bottom-0 left-0 right-0 mt-24 flex flex-col overflow-hidden rounded-t-[10px] border bg-background',
              className,
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
              <div className="my-3 h-1.5 w-16 rounded-full bg-muted-foreground/20" />
            </div>
            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  // if (isMobile) {
  //   return (
  //     <Drawer open={showModal} onClose={setShowModal}>
  //       <DrawerPortal>
  //         <DrawerContent>{children}</DrawerContent>
  //       </DrawerPortal>
  //     </Drawer>
  //   )
  // }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="overflow-hidden p-0 md:max-w-md md:rounded-2xl md:border">
        {children}
      </DialogContent>
    </Dialog>
  )
}
