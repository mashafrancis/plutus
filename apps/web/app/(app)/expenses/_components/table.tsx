'use client'

import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import DataTable from '@/components/table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { expensesCategory } from '@/constants/categories'
import messages from '@/constants/messages'
import { lookup } from '@/lib/lookup'
import { ExpenseData } from '@/lib/validations/expenses'
import { useCallback, useState } from 'react'

import Add from '@/components/add-button'
import { useMounted } from '@/hooks/use-mounted'
import { useExpenseModal } from '@/store/use-expense-modal'
import { deleteExpense } from '../apis'
import { columns } from './columns'

const categories = Object.keys(expensesCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: expensesCategory[categoryKey]?.name,
    value: categoryKey,
  }))

export default function ExpenseTable() {
  const [selected, setSelected] = useState({})
  const { data, loading, filter, mutate } = useData()
  const user = useUser()
  const { toast } = useToast()
  const { onClose } = useExpenseModal()
  const _mounted = useMounted()

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await deleteExpense(id)
        toast({ description: messages.deleted })
        mutate()
      } catch {
        toast({ description: messages.error, variant: 'destructive' })
      }
    },
    [mutate, toast],
  )

  const onEdit = useCallback(async (data: ExpenseData | any) => {
    setSelected(data)
  }, [])

  const onHide = useCallback(() => {
    setSelected({})
    onClose()
  }, [])

  const onLookup = useCallback(
    (name: string) =>
      lookup({
        data,
        name,
      }),
    [data],
  )

  return (
    <>
      <DataTable
        options={{ user, onDelete, onEdit }}
        filter={filter}
        columns={columns}
        data={data}
        loading={loading}
        filename="Expenses"
        // @ts-expect-error
        categories={categories}
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="expenses"
      />
    </>
  )
}
