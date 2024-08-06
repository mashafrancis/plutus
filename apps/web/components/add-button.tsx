'use client'

import AddButtonContent from '@/components/add-button-content'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'
import shortcuts from '@/constants/shortcuts'
import { useExpenseModal } from '@/store/use-expense-modal'
import { PlusIcon } from 'lucide-react'
import { Fragment } from 'react'

const _openShortcutKey = Object.values(shortcuts.modal.open.shortcut)

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions'

type AddProps = {
  type?: TypeProps
  selected?: any
  onHide?: () => void
  onLookup?: (name: string) => void
}

export default function Add({
  type,
  selected = {},
  onHide,
  onLookup,
}: AddProps) {
  const { onOpen, isOpen, onClose } = useExpenseModal()
  return (
    <Fragment>
      <Button
        className="capitalize"
        icon={<PlusIcon size={12} />}
        onClick={onOpen}
      >
        {type}
      </Button>
      <Modal showModal={isOpen} setShowModal={onClose}>
        <div className="w-full">
          <AddButtonContent
            selected={selected}
            type={type}
            onHide={onHide}
            onLookup={onLookup}
          />
        </div>
      </Modal>
    </Fragment>
  )
}
