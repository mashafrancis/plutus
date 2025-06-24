'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';

const icons = {
  '/overview': () => <Icons.Overview className="m-auto" size={22} />,
  '/expenses': () => <Icons.Overview className="m-auto" size={22} />,
  '/income': () => <Icons.Overview className="m-auto" size={22} />,
  '/investments': () => <Icons.Overview className="m-auto" size={22} />,
  '/subscriptions': () => <Icons.Overview className="m-auto" size={22} />,
} as const;

const items = [
  {
    path: '/overview',
    name: 'Overview',
  },
  {
    path: '/expenses',
    name: 'Expenses',
  },
  {
    path: '/income',
    name: 'Income',
  },
  {
    path: '/investments',
    name: 'Investments',
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
  },
  // {
  // 	path: '/customers',
  // 	name: 'Customers',
  // },
  // {
  // 	path: '/vault',
  // 	name: 'Vault',
  // },
  // {
  // 	path: '/apps',
  // 	name: 'Apps',
  // },
  // {
  // 	path: '/settings',
  // 	name: 'Settings',
  // },
];

interface ItemProps {
  item: { path: string; name: string };
  isActive: boolean;
  onSelect?: () => void;
}

const Item = ({ item, isActive, onSelect }: ItemProps) => {
  const Icon = icons[item.path as keyof typeof icons];

  return (
    <Link href={item.path} onClick={() => onSelect?.()} prefetch>
      <div className="flex size-[70px] items-center justify-center border-border border-b">
        <div className="relative">
          <div className="flex flex-col items-center space-x-3 p-0 pl-2 md:pl-0">
            <Icon />
            <span className="flex text-muted-foreground text-xs tracking-tighter">
              {item.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

type Props = {
  onSelect?: () => void;
};

export function MainMenu({ onSelect }: Props) {
  const pathname = usePathname();
  const part = pathname?.split('/')[1];

  return (
    <div className="mt-6">
      <nav>
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive =
              (pathname === '/' && item.path === '/') ||
              (pathname !== '/' && item.path.startsWith(`/${part}`));

            return (
              <Item
                isActive={isActive}
                item={item}
                key={item.path}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
}
