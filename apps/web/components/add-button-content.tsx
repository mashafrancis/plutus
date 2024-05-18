import { Fragment } from 'react'

import AddExpense from '@/components/add/expenses'
import AddIncome from '@/components/add/income'
import AddInvestments from '@/components/add/investments'
import AddSubscriptions from '@/components/add/subscriptions'
import { useExpenseModal } from '@/store/use-expense-modal'

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions'

type AddButtonProps = {
  mutate?: any
  type?: TypeProps
  selected?: any
  onLookup?: (name: string) => void
  onHide?: () => void
}

export default function AddButtonContent({
  mutate,
  type,
  selected,
  onLookup,
  onHide,
}: AddButtonProps) {
  const { onClose } = useExpenseModal()
  return (
    <Fragment>
      {type === 'expenses' ? (
        <AddExpense
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            onClose()
          }}
        />
      ) : null}
      {type === 'income' ? (
        <AddIncome
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            onClose()
          }}
        />
      ) : null}
      {type === 'investments' ? (
        <AddInvestments
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            onClose()
          }}
        />
      ) : null}
      {type === 'subscriptions' ? (
        <AddSubscriptions
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            onClose()
          }}
        />
      ) : null}
    </Fragment>
  )
}
