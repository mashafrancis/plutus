import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ModalContent, ModalHeader } from '@/modals/common/container'
import type { HtmlProps } from '@/types'
import { popModal } from './index'

export type ConfirmProps = {
  title: string
  text: string
  onConfirm: () => void
  onCancel?: () => void
}

function ButtonContainer({ className, ...props }: HtmlProps<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 flex justify-between', className)} {...props} />
  )
}

export default function Confirm({
  title,
  text,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  return (
    <ModalContent>
      <ModalHeader title={title} />
      <p>{text}</p>
      <ButtonContainer>
        <Button
          type="outline"
          onClick={() => {
            popModal('confirm')
            onCancel?.()
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            popModal('confirm')
            onConfirm()
          }}
        >
          Yes
        </Button>
      </ButtonContainer>
    </ModalContent>
  )
}
