'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import shortcuts from '@/constants/shortcuts';

const _openShortcutKey = Object.values(shortcuts.modal.open.shortcut);

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions';

type AddProps = {
  type?: TypeProps;
  selected?: any;
  onHide?: () => void;
  onLookup?: (name: string) => void;
};

export default function Add({
  type,
  selected = {},
  onHide,
  onLookup,
}: AddProps) {
  return (
    <Button className="capitalize">
      <PlusIcon size={12} />
      {type}
    </Button>
  );
}
