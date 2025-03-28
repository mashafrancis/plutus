import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { type Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className = '',
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="text"
            // size="small"
            className="-ml-3 h-10 whitespace-nowrap hover:opacity-80 focus-visible:ring-0 data-[state=open]:bg-accent"
            iconRight={
              column.getIsSorted() === 'desc' ? (
                <ArrowDown
                  strokeWidth={1}
                  size={18}
                  className="ml-1 mt-[1px] h-3.5 w-3.5"
                />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp
                  strokeWidth={1}
                  size={18}
                  className="ml-1 mt-[1px] h-3.5 w-3.5"
                />
              ) : (
                <ArrowUpDown
                  strokeWidth={1}
                  size={18}
                  className="ml-1 mt-[1px] h-3.5 w-3.5"
                />
              )
            }
          >
            <span className="text-sm capitalize">{title}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-foreground-lighter/80" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-foreground-lighter/80" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
