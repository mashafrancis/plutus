import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { popModal } from '@/modals'
import type { DialogContentProps } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import type { ReactNode } from 'react'
import { X } from 'react-feather'

interface ModalContentProps extends DialogContentProps {
  children: ReactNode
  onClose?: boolean
}

export function ModalContent({
  children,
  onClose,
  ...props
}: ModalContentProps) {
  const { isDesktop } = useMediaQuery()

  if (isDesktop) {
    return (
      <>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <DialogContent
          className="overflow-hidden p-0 md:rounded-2xl md:border"
          aria-describedby={props.title}
          {...props}
        >
          {children}
        </DialogContent>
      </>
    )
  }

  return (
    <>
      <VisuallyHidden asChild>
        <DrawerTitle />
      </VisuallyHidden>
      <DrawerContent
        className="overflow-hidden p-0 md:rounded-2xl md:border"
        aria-describedby={props.title}
        {...props}
      >
        {children}
        {onClose && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button onClick={() => popModal()} type="outline" size="large">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </>
  )
}

interface ModalHeaderProps {
  title: string | ReactNode
  text?: string | ReactNode
  onClose?: (() => void) | false
  className?: string
}

export function ModalHeader({
  title,
  text,
  onClose,
  className,
}: ModalHeaderProps) {
  const { isDesktop } = useMediaQuery()

  if (isDesktop) {
    return (
      <DialogHeader
        className={cn(
          'items-center justify-center border-b bg-secondary/70  px-4 py-8 md:px-8',
          className,
        )}
      >
        <DialogTitle>{title}</DialogTitle>
        {!!text && <DialogDescription>{text}</DialogDescription>}
        {onClose !== false && (
          <DialogClose
            onClick={() => (onClose ? onClose() : popModal())}
            className="absolute top-4 right-4 rounded-full p-1 text-foreground-lighter opacity-70 outline-none ring-offset-background transition-opacity hover:text-foreground-lighter hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-current focus:ring-offset-1 disabled:pointer-events-none data-[state=open]:bg-muted-foreground data-[state=open]:text-foreground-lighter"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </DialogHeader>
    )
  }

  return (
    <DrawerHeader
      className={cn(
        'border-b items-center justify-center px-4 py-8 md:px-8',
        className,
      )}
    >
      <DrawerTitle>{title}</DrawerTitle>
      {!!text && <DrawerDescription>{text}</DrawerDescription>}
    </DrawerHeader>
  )
}
