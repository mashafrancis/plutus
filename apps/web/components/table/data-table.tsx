'use client'

import { useMemo, useState } from 'react'

import { DataTablePagination } from '@/components/table/data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import TableLoader from './data-table-loader'
import DataTableToolbar from './data-table-toolbar'

declare module '@tanstack/react-table' {
  // @ts-expect-error
  interface TableMeta<_TData extends RowData> {
    user: any
    onDelete: (id: any) => void
    onEdit: (data: any) => void
    onChange?: (data: any) => void
  }
}

type DataTableProps = {
  data: Array<any>
  columns: Array<any>
  loading: boolean
  filter: {
    name: string
    setFilter: (filter: string) => void
    onFilter: (categories: any) => void
  }
  options: {
    user: any
    onDelete: (id: string) => void
    onEdit: (data: any) => void
    onChange?: (data: any) => void
  }
  filename: string
  hideViewOptions?: boolean | undefined
  categories?: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export default function DataTable<_TData, _TValue>(props: DataTableProps) {
  const {
    data,
    columns,
    loading,
    categories,
    filter,
    options,
    filename,
    hideViewOptions,
  } = props
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const memoizedColumns = useMemo(() => columns, [columns])

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
    state: { sorting, columnFilters, columnVisibility },
    meta: options,
  })

  return (
    <div className="mb-8 hidden md:block space-y-4">
      <DataTableToolbar
        categories={categories}
        user={options.user}
        filename={filename}
        filter={filter}
        loading={loading}
        table={table}
        hideViewOptions={hideViewOptions}
      />
      <div className="rounded-md border border-border bg-background">
        <Table>
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
            ) : loading && table.getRowModel().rows?.length === 0 ? (
              <TableLoader rows={5} columns={columns.length} />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[450px] text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
