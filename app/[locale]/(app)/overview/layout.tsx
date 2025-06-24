import type { ReactNode } from 'react';
import Add from '@/components/add-button';
import AppHeader from '@/components/app-header';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <AppHeader
        addButton={<Add type="expenses" />}
        description="A glimpse of all your financial data."
        showDatePicker
        title="Overview"
      />
      {children}
    </>
  );
}
