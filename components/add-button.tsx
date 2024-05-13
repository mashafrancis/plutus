'use client'

import AddButtonContent from '@/components/add-button-content'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui-elements/button'
import shortcuts from '@/constants/shortcuts'
import { useExpenseModal } from '@/store/use-expense-modal'
import { PlusIcon } from 'lucide-react'
import { Fragment } from 'react'

const _openShortcutKey = Object.values(shortcuts.modal.open.shortcut)

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions'

type AddProps = {
  mutate?: any
  type?: TypeProps
  selected?: any
  onHide?: () => void
  onLookup?: (name: string) => void
}

export default function Add({
  mutate,
  type,
  selected = {},
  onHide,
  onLookup,
}: AddProps) {
  const { onOpen, isOpen, onClose } = useExpenseModal()
  return (
    <Fragment>
      <Button
        className="uppercase"
        icon={<PlusIcon className="h-5 w-5" />}
        onClick={onOpen}
      >
        {type}
      </Button>
      <Modal showModal={isOpen} setShowModal={onClose}>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
            <AddButtonContent
              selected={selected}
              mutate={mutate}
              type={type}
              onHide={onHide}
              onLookup={onLookup}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}
