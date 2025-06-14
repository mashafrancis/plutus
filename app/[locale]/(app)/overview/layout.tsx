import Add from "@/components/add-button";
import AppHeader from "@/components/app-header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <AppHeader
        title="Overview"
        description="A glimpse of all your financial data."
        showDatePicker
        addButton={<Add type="expenses" />}
      />
      {children}
    </>
  );
}
