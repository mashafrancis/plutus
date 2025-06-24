import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/app-sidebar';
import { getQueryClient, trpc } from '@/trpc/server';

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const user = await queryClient.fetchQuery(trpc.users.me.queryOptions());

  if (!user) {
    redirect('/login');
  }
  return (
    <div className="relative">
      <Sidebar />
      <main className="flex flex-1 flex-col md:ml-[70px]">{children}</main>
    </div>
  );
}
