'use client'

import { deleteExpensesAction } from '@/actions/delete-expense-action'
import type { UpdateExpenseFormValues } from '@/actions/schema'
import { updateColumnVisibilityAction } from '@/actions/update-column-visibility-action'
import { updateExpenseAction } from '@/actions/update-expenses-actions'
import { Spinner } from '@/components/loader/spinner'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMounted } from '@/hooks/use-mounted'
import { Cookies } from '@/lib/constants'
import { lookup } from '@/lib/lookup'
import { useExpensesStore } from '@/store/expenses'
import { useExpenseModal } from '@/store/use-expense-modal'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useAction } from 'next-safe-action/hooks'
import {
  type ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'

// type DataTableProp = {
//   data: Array<any>
//   columns: Array<any>
//   filter: {
//     name: string
//     setFilter: (filter: string) => void
//     onFilter: (categories: any) => void
//   }
//   meta: Record<string, string>
//   loadMore: () => void
//   options: {
//     user: any
//     // onDelete: (id: string) => void
//     // onEdit: (data: any) => void
//     // onChange?: (data: any) => void
//   }
//   filename: string
//   hideViewOptions?: boolean | undefined
//   categories?: {
//     label: string
//     value: string
//     icon?: React.ComponentType<{ className?: string }>
//   }[]
// }

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hasNextPage?: boolean
  hasFilters?: boolean
  loadMore: () => void
  query?: string
  pageSize: number
  meta: Record<string, string>
  initialColumnVisibility: VisibilityState
  categories?: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
  options: {
    user: any
  }
}

export function DataTable<TData, TValue>({
  columns,
  query,
  data: initialData,
  pageSize,
  loadMore,
  meta: pageMeta,
  hasFilters,
  hasNextPage: initialHasNextPage,
  initialColumnVisibility,
  options,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData)
  const [_selected, setSelected] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [from, setFrom] = useState(pageSize)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility ?? {},
  )
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const { ref, inView } = useInView()

  const { setColumns, setCanDelete, setExpensesIds } = useExpensesStore()

  const memoizedColumns = useMemo(() => columns, [columns])

  const { onClose } = useExpenseModal()
  const _mounted = useMounted()

  const updateExpense = useAction(updateExpenseAction, {
    onSuccess: ({ status }: any) => {
      if (status === 'excluded') {
        toast.success('Expense updated successfully.', {
          duration: 3500,
          description:
            'You can view excluded transactions by adding the filter excluded.',
        })
      }
    },
    onError: () => {
      toast.error('Something went wrong please try again.', {
        duration: 3500,
      })
    },
  })

  const handleUpdateExpense = (
    values: UpdateExpenseFormValues,
    optimisticData?: any,
  ) => {
    setData((prev) => {
      return prev.map((item) => {
        // @ts-expect-error
        if (item.id === values.id) {
          return {
            ...item,
            ...values,
            ...(optimisticData ?? {}),
          }
        }

        return item
      })
    })

    updateExpense.execute(values)
  }

  const deleteExpenses = useAction(deleteExpensesAction, {
    onError: () => {
      toast.error('Something went wrong! Please try again.', {
        duration: 3500,
      })
    },
  })

  const handleDeleteExpenses = ({ ids }) => {
    setData((prev) => {
      return prev.filter((item) => !ids?.includes(item.id))
    })

    deleteExpenses.execute({ ids })
  }

  const onEdit = useCallback(async (data: UpdateExpenseFormValues) => {
    console.log('Class: DataTable, Function: , Line 179 data():', data)
    setSelected(data)
  }, [])

  // const _onHide = useCallback(() => {
  //   setSelected({})
  //   onClose()
  // }, [])

  const _onLookup = useCallback(
    (name: string) =>
      lookup({
        data,
        name,
      }),
    [data],
  )

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    meta: {
      onClose,
      onEdit: onEdit,
      deleteExpenses: handleDeleteExpenses,
      updateExpense: handleUpdateExpense,
    },
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      columnFilters,
    },
  })

  const loadMoreData = async () => {
    const formatedFrom = from
    const to = formatedFrom + pageSize * 2

    try {
      // @ts-expect-error
      const { data, meta } = await loadMore({
        from: formatedFrom,
        to,
      })

      setData((prev) => [...prev, ...data])
      setFrom(to)
      setHasNextPage(meta.count > to)
    } catch {
      setHasNextPage(false)
    }
  }

  useEffect(() => {
    // @ts-expect-error
    setColumns(table.getAllLeafColumns())
  }, [columnVisibility])

  useEffect(() => {
    const transactions = data.filter((expense) => {
      const found = rowSelection[expense.id]
      if (found) {
        return !expense?.manual
      }
    })

    if (Object.keys(rowSelection)?.length > 0) {
      if (transactions.length === 0) {
        setCanDelete(true)
      } else {
        setCanDelete(false)
      }
    }

    setExpensesIds(Object.keys(rowSelection))
  }, [rowSelection])

  useEffect(() => {
    updateColumnVisibilityAction({
      key: Cookies.ExpensesColumns,
      data: columnVisibility,
    })
  }, [columnVisibility])

  useEffect(() => {
    if (inView) {
      loadMoreData()
    }
  }, [inView])

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  return (
    <div className="mb-8 hidden md:block space-y-4">
      {/*<DataTableToolbar*/}
      {/*  categories={categories}*/}
      {/*  user={options.user}*/}
      {/*  filename={filename}*/}
      {/*  filter={filter}*/}
      {/*  table={table}*/}
      {/*  hideViewOptions={hideViewOptions}*/}
      {/*/>*/}
      <div className="rounded-md border border-border bg-background">
        <Table>
          {/*<DataTableHeader table={table} />*/}
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-black dark:text-white"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[450px] text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {hasNextPage && (
        <div className="flex items-center justify-center mt-6" ref={ref}>
          <Button type="outline" className="space-x-2 px-6 py-5">
            <Spinner />
            <span className="text-sm text-[#606060]">Loading more...</span>
          </Button>
        </div>
      )}

      {/*<BottomBar*/}
      {/*  show={showBottomBar as boolean}*/}
      {/*  // @ts-expect-error*/}
      {/*  count={pageMeta?.count}*/}
      {/*  // @ts-expect-error*/}
      {/*  totalAmount={pageMeta?.totalAmount}*/}
      {/*	currency={options.user.currency}*/}
      {/*/>*/}
    </div>
  )
}
