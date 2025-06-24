import { cn } from '@dub/utils';
import type { Table } from '@tanstack/react-table';
import { Command } from 'cmdk';
import { useState } from 'react';
import { Button } from '../button';
import { Gear } from '../icons';
import { Popover } from '../popover';

export function EditColumnsButton({ table }: { table: Table<any> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      align="end"
      content={
        <Command loop tabIndex={0}>
          <Command.List className="flex w-screen flex-col gap-1 p-1 text-sm focus-visible:outline-none sm:w-auto sm:min-w-[130px]">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <Command.Item
                  className={cn(
                    'flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5',
                    'data-[selected=true]:bg-neutral-100'
                  )}
                  key={column.id}
                  onSelect={() => column.toggleVisibility()}
                >
                  <input
                    checked={column.getIsVisible()}
                    className="h-3 w-3 rounded-full border-neutral-300 text-black focus:outline-none focus:ring-0"
                    disabled
                    type="checkbox"
                  />
                  {column.columnDef.header?.toString()}
                </Command.Item>
              ))}
          </Command.List>
        </Command>
      }
      openPopover={isOpen}
      setOpenPopover={setIsOpen}
    >
      <Button
        className="h-8 whitespace-nowrap px-2"
        icon={<Gear className="h-4 w-4 shrink-0" />}
        type="button"
        variant="outline"
      />
    </Popover>
  );
}
