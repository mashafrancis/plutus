import { cn, deepEqual, isClickOnInteractiveChild } from '@dub/utils';
import {
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnPinningState,
  type ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type Table as TableType,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type CSSProperties,
  type Dispatch,
  type HTMLAttributes,
  type MouseEvent,
  memo,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button } from '../button';
import { LoadingSpinner, SortOrder } from '../icons';

const tableCellClassName = (columnId: string, clickable?: boolean) =>
  cn([
    'relative whitespace-nowrap border-border-subtle px-4 py-2.5 text-left text-sm leading-6',
    'border-b border-l',
    columnId === 'menu' && 'border-l-transparent bg-bg-default px-1 py-0',
    clickable && 'transition-colors duration-75 group-hover/row:bg-bg-muted',
  ]);

const resizingClassName = cn([
  'absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none',
  'bg-neutral-300/50',
  'opacity-0 hover:opacity-100 group-hover/resize:opacity-100',
  'hover:bg-neutral-400 group-hover/resize:bg-neutral-300',
  'transition-all duration-200',
  '-mr-px',
  'after:absolute after:top-0 after:right-0 after:h-full after:w-4 after:translate-x-1/2',
]);

type BaseTableProps<T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;
  error?: string;
  emptyState?: ReactNode;
  cellRight?: (cell: Cell<T, any>) => ReactNode;
  defaultColumn?: Partial<ColumnDef<T, any>>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (props: {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => void;
  sortableColumns?: string[];
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  columnPinning?: ColumnPinningState;
  resourceName?: (plural: boolean) => string;
  onRowClick?: (row: Row<T>, e: MouseEvent) => void;
  rowProps?:
    | HTMLAttributes<HTMLTableRowElement>
    | ((row: Row<T>) => HTMLAttributes<HTMLTableRowElement>);
  enableColumnResizing?: boolean;
  columnResizeMode?: ColumnResizeMode;

  // Row selection
  getRowId?: (row: T) => string;
  onRowSelectionChange?: (rows: Row<T>[]) => void;
  selectedRows?: RowSelectionState;

  // Table styles
  className?: string;
  containerClassName?: string;
  scrollWrapperClassName?: string;
  thClassName?: string | ((columnId: string) => string);
  tdClassName?: string | ((columnId: string) => string);
};

type UseTableProps<T> = BaseTableProps<T> &
  (
    | {
        pagination?: PaginationState;
        onPaginationChange?: Dispatch<SetStateAction<PaginationState>>;
        rowCount: number;
      }
    | { pagination?: never; onPaginationChange?: never; rowCount?: never }
  );

type TableProps<T> = BaseTableProps<T> &
  PropsWithChildren<{
    table: TableType<T>;
  }> &
  (
    | {
        pagination?: PaginationState;
        rowCount: number;
      }
    | { pagination?: never; rowCount?: never }
  );

export function useTable<T>(
  props: UseTableProps<T>
): TableProps<T> & { table: TableType<T> } {
  const {
    data,
    rowCount,
    columns,
    defaultColumn,
    columnPinning,
    pagination,
    onPaginationChange,
    getRowId,
    enableColumnResizing = false,
    columnResizeMode = 'onChange',
  } = props;

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    props.columnVisibility ?? {}
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    props.selectedRows ?? {}
  );

  useEffect(() => {
    if (props.selectedRows && !deepEqual(props.selectedRows, rowSelection)) {
      setRowSelection(props.selectedRows ?? {});
    }
  }, [props.selectedRows, rowSelection]);

  useEffect(() => {
    props.onRowSelectionChange?.(table.getSelectedRowModel().rows);
  }, [props.onRowSelectionChange, table.getSelectedRowModel]);

  // Update internal columnVisibility when prop value changes
  useEffect(() => {
    if (
      props.columnVisibility &&
      !deepEqual(props.columnVisibility, columnVisibility)
    ) {
      setColumnVisibility(props.columnVisibility ?? {});
    }
  }, [props.columnVisibility, columnVisibility]);

  // Call onColumnVisibilityChange when internal columnVisibility changes
  useEffect(() => {
    props.onColumnVisibilityChange?.(columnVisibility);
  }, [columnVisibility, props.onColumnVisibilityChange]);

  const table = useReactTable({
    data,
    rowCount,
    columns,
    defaultColumn: {
      minSize: 120,
      size: 0,
      maxSize: 300,
      enableResizing: enableColumnResizing,
      ...defaultColumn,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange,
    onColumnVisibilityChange: (visibility) => setColumnVisibility(visibility),
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      columnVisibility,
      columnPinning: { left: [], right: [], ...columnPinning },
      rowSelection,
    },
    manualPagination: true,
    autoResetPageIndex: false,
    manualSorting: true,
    getRowId,
    enableColumnResizing,
    columnResizeMode,
  });

  return {
    ...props,
    columnVisibility,
    table,
    enableColumnResizing,
  };
}

// Memoized row component to prevent re-renders during column resizing
const ResizableTableRow = memo(
  function ResizableTableRow<T>({
    row,
    onRowClick,
    rowProps,
    cellRight,
    tdClassName,
    table,
  }: {
    row: Row<T>;
    onRowClick?: (row: Row<T>, e: MouseEvent) => void;
    rowProps?: HTMLAttributes<HTMLTableRowElement>;
    cellRight?: (cell: Cell<T, any>) => ReactNode;
    tdClassName?: string | ((columnId: string) => string);
    table: TableType<T>;
  }) {
    const { className, ...rest } = rowProps || {};

    return (
      <tr
        className={cn(
          'group/row',
          onRowClick && 'cursor-pointer select-none',
          // hacky fix: if there are more than 8 rows, remove the bottom border from the last row
          table.getRowModel().rows.length > 8 &&
            row.index === table.getRowModel().rows.length - 1 &&
            '[&_td]:border-b-0',
          className
        )}
        key={row.id}
        onClick={
          onRowClick
            ? (e) => {
                // Ignore if click is on an interactive child
                if (isClickOnInteractiveChild(e)) {
                  return;
                }
                onRowClick(row, e);
              }
            : undefined
        }
        {...rest}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            className={cn(
              tableCellClassName(cell.column.id, !!onRowClick),
              'group text-content-default',
              getCommonPinningClassNames(
                cell.column,
                row.index === table.getRowModel().rows.length - 1
              ),
              typeof tdClassName === 'function'
                ? tdClassName(cell.column.id)
                : tdClassName
            )}
            key={cell.id}
            style={{
              width: cell.column.getSize(),
              ...getCommonPinningStyles(cell.column),
            }}
          >
            <div className="flex w-full items-center justify-between overflow-hidden truncate">
              <div className="min-w-0 shrink grow truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
              {cellRight?.(cell)}
            </div>
          </td>
        ))}
      </tr>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if row data or selection state changes
    const prevRow = prevProps.row;
    const nextRow = nextProps.row;
    return (
      prevRow.original === nextRow.original &&
      prevRow.getIsSelected() === nextRow.getIsSelected()
    );
  }
) as <T>(props: {
  row: Row<T>;
  onRowClick?: (row: Row<T>, e: MouseEvent) => void;
  rowProps?: HTMLAttributes<HTMLTableRowElement>;
  cellRight?: (cell: Cell<T, any>) => ReactNode;
  tdClassName?: string | ((columnId: string) => string);
  table: TableType<T>;
}) => JSX.Element;

export function Table<T>({
  data,
  loading,
  error,
  emptyState,
  cellRight,
  sortBy,
  sortOrder,
  onSortChange,
  sortableColumns = [],
  className,
  containerClassName,
  scrollWrapperClassName,
  thClassName,
  tdClassName,
  table,
  pagination,
  resourceName,
  onRowClick,
  rowProps,
  rowCount,
  children,
  enableColumnResizing = false,
}: TableProps<T>) {
  // Memoize table width calculation
  const tableWidth = useMemo(() => {
    if (!enableColumnResizing) {
      return '100%';
    }
    return table
      .getVisibleLeafColumns()
      .reduce((acc, column) => acc + column.getSize(), 0);
  }, [enableColumnResizing, table.getVisibleLeafColumns]);

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border-subtle bg-bg-default',
        containerClassName
      )}
    >
      {(!error && !!data?.length) || loading ? (
        <div
          className={cn(
            'relative min-h-[400px] overflow-x-auto rounded-[inherit]',
            scrollWrapperClassName
          )}
        >
          <table
            className={cn(
              [
                'group/table w-full border-separate border-spacing-0 transition-[border-spacing,margin-top]',
                '[&_tr>*:first-child]:border-l-transparent',
                '[&_tr>*:last-child]:border-r-transparent',
                '[&_tr>*:last-child]:border-r-transparent',
                '[&_th]:relative [&_th]:select-none',
                enableColumnResizing && '[&_th]:group/resize',
              ],
              className
            )}
            style={{
              width: '100%',
              tableLayout: enableColumnResizing ? 'fixed' : 'auto',
              minWidth: tableWidth,
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isSortableColumn = sortableColumns.includes(
                      header.column.id
                    );
                    const ButtonOrDiv = isSortableColumn ? 'button' : 'div';

                    return (
                      <th
                        className={cn(
                          tableCellClassName(header.id),
                          'select-none font-medium text-content-emphasis',
                          getCommonPinningClassNames(
                            header.column,
                            !table.getRowModel().rows.length
                          ),
                          typeof thClassName === 'function'
                            ? thClassName(header.column.id)
                            : thClassName,
                          enableColumnResizing && 'relative'
                        )}
                        colSpan={header.colSpan}
                        key={header.id}
                        style={{
                          width: header.getSize(),
                          ...getCommonPinningStyles(header.column),
                        }}
                      >
                        <div className="!pr-0 flex items-center justify-between gap-6">
                          <ButtonOrDiv
                            className="flex items-center gap-2"
                            {...(isSortableColumn && {
                              type: 'button',
                              disabled: !isSortableColumn,
                              'aria-label': 'Sort by column',
                              onClick: () =>
                                onSortChange?.({
                                  sortBy: header.column.id,
                                  sortOrder:
                                    sortBy !== header.column.id
                                      ? 'desc'
                                      : sortOrder === 'asc'
                                        ? 'desc'
                                        : 'asc',
                                }),
                            })}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {isSortableColumn &&
                              sortBy === header.column.id && (
                                <SortOrder
                                  className="h-3 w-3 shrink-0"
                                  order={sortOrder || 'desc'}
                                />
                              )}
                          </ButtonOrDiv>
                        </div>
                        {enableColumnResizing &&
                          header.column.getCanResize() &&
                          header.column.id !== 'menu' && (
                            <div
                              className={resizingClassName}
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                            />
                          )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const props =
                  typeof rowProps === 'function' ? rowProps(row) : rowProps;
                const { className, ...rest } = props || {};

                return enableColumnResizing ? (
                  <ResizableTableRow
                    cellRight={cellRight}
                    key={`${row.id}-${table
                      .getVisibleLeafColumns()
                      .map((col) => col.id)
                      .join(',')}`}
                    onRowClick={onRowClick}
                    row={row}
                    rowProps={props}
                    table={table}
                    tdClassName={tdClassName}
                  />
                ) : (
                  <tr
                    className={cn(
                      'group/row',
                      onRowClick && 'cursor-pointer select-none',
                      table.getRowModel().rows.length > 8 &&
                        row.index === table.getRowModel().rows.length - 1 &&
                        '[&_td]:border-b-0',
                      className
                    )}
                    key={row.id}
                    onClick={
                      onRowClick
                        ? (e) => {
                            if (isClickOnInteractiveChild(e)) {
                              return;
                            }
                            onRowClick(row, e);
                          }
                        : undefined
                    }
                    {...rest}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className={cn(
                          tableCellClassName(cell.column.id, !!onRowClick),
                          'group text-content-default',
                          getCommonPinningClassNames(
                            cell.column,
                            row.index === table.getRowModel().rows.length - 1
                          ),
                          typeof tdClassName === 'function'
                            ? tdClassName(cell.column.id)
                            : tdClassName
                        )}
                        key={cell.id}
                        style={{
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize,
                          width: cell.column.columnDef.size || 'auto',
                          ...getCommonPinningStyles(cell.column),
                        }}
                      >
                        <div className="flex w-full items-center justify-between overflow-hidden truncate">
                          <div className="min-w-0 shrink grow truncate">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                          {cellRight?.(cell)}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {children}
        </div>
      ) : (
        <div className="flex h-96 w-full items-center justify-center text-content-subtle text-sm">
          {error ||
            emptyState ||
            `No ${resourceName?.(true) || 'items'} found.`}
        </div>
      )}
      {pagination && !error && !!data?.length && !!rowCount && (
        <div className="-mt-px sticky bottom-0 mx-auto flex w-full max-w-full items-center justify-between rounded-b-[inherit] border-border-subtle border-t bg-bg-default px-4 py-3.5 text-content-default text-sm leading-6">
          <div>
            <span className="hidden sm:inline-block">Viewing</span>{' '}
            <span className="font-medium">
              {(
                (pagination.pageIndex - 1) * pagination.pageSize +
                1
              ).toLocaleString()}
              -
              {Math.min(
                (pagination.pageIndex - 1) * pagination.pageSize +
                  pagination.pageSize,
                table.getRowCount()
              ).toLocaleString()}
            </span>{' '}
            of{' '}
            <span className="font-medium">
              {table.getRowCount().toLocaleString()}
            </span>{' '}
            {resourceName?.(table.getRowCount() !== 1) || 'items'}
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="h-7 px-2"
              disabled={pagination.pageIndex === 1}
              onClick={() => table.previousPage()}
              text="Previous"
              // disabled={!table.getCanPreviousPage()}
              variant="secondary"
            />
            <Button
              className="h-7 px-2"
              disabled={pagination.pageIndex === table.getPageCount()}
              onClick={() => table.nextPage()}
              text="Next"
              // disabled={!table.getCanNextPage()}
              variant="secondary"
            />
          </div>
        </div>
      )}

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full bg-bg-default/50"
            initial={{ opacity: 0 }}
          >
            <div className="flex h-[75vh] w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const getCommonPinningClassNames = (
  column: Column<any>,
  isLastRow: boolean
): string => {
  const isPinned = column.getIsPinned();
  return cn(
    isPinned &&
      !isLastRow &&
      'animate-table-pinned-shadow [animation-timeline:scroll(inline)]'
  );
};

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
  };
};
