'use client'

import DataTableColumnHeader from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { expensesCategory, expensesPay } from '@/constants/categories'
import { formatCurrency, formatDate } from '@/lib/formatter'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'react-feather'

export type Expenses = {
  name: string
  date: string
  price: string
  category: string
  paid_via: string
  notes: string
  created_at: string
  updated_at: string
  id: string
  actions: string
}

export const columns: ColumnDef<Expenses>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const date = row.getValue<string>('date')
      return formatDate({ date, locale: user?.locale })
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      const category = row.getValue<string>('category')
      return (
        <>
          <span className="mr-2">{expensesCategory[category]?.emoji}</span>{' '}
          {row.getValue('name')}
        </>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const price = parseFloat(row.getValue('price'))
      const formatted = formatCurrency({
        value: price,
        currency: user?.currency,
        locale: user?.locale,
      })
      return <span className="tabular-nums">{formatted}</span>
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue<string>('category')
      return <div className="">{expensesCategory[category]?.name}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'paid_via',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="paid via" />
    ),
    cell: ({ row }) => {
      const paid_via = row.getValue<string>('paid_via')
      return <div className="">{expensesPay[paid_via]?.name}</div>
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      return (
        <TooltipProvider delayDuration={20}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex space-x-2 items-center">
                <span className="line-clamp-1 text-ellipsis max-w-[120px]">
                  {row.original.notes}
                </span>
              </div>
            </TooltipTrigger>
            {row.original?.notes && (
              <TooltipContent
                className="px-3 py-1.5 text-sm max-w-[380px] border shadow-md"
                side="left"
                sideOffset={10}
              >
                {row.original.notes}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (props) => {
      const {
        row,
        table: {
          options: { meta },
        },
      } = props
      return (
        <div className="flex gap-1">
          <Button
            className="hover:bg-primary/10 hover:text-primary"
            type="outline"
            icon={
              <Edit
                strokeWidth={1}
                size={14}
                onClick={() => {
                  meta?.onEdit(row.original)
                }}
              />
            }
          />
          <Button
            className="hover:bg-destructive/10 hover:text-destructive"
            type="outline"
            icon={
              <Trash2
                strokeWidth={1}
                size={14}
                onClick={() => {
                  meta?.onDelete(row.original?.id)
                }}
              />
            }
          />
        </div>
      )
    },
  },
]
