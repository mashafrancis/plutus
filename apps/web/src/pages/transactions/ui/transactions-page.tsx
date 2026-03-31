import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useCategoriesList } from "@/entities/category/api/use-categories-list";
import { useTransactionsList } from "@/entities/transaction/api/use-transactions-list";
import { CreateTransactionDialog } from "@/features/create-transaction/ui/create-transaction-dialog";

import { TransactionRow } from "./transaction-row";
import { TransactionsTableSkeleton } from "./transactions-table-skeleton";

export function TransactionsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-64" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {new Array(5).fill().map((_, i) => (
              <div className="flex items-center gap-4" key={i}>
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "expense" | "income" | "transfer">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: transactions } = useTransactionsList({
    limit: 50,
    ...(filter !== "all" && { type: filter }),
  });
  const { data: accounts } = useAccountsList();
  const { data: categories } = useCategoriesList();

  // Only show full skeleton when accounts/categories are not loaded yet (initial load)
  if (!(accounts && categories)) {
    return <TransactionsPageSkeleton />;
  }

  const accountMap = new Map(accounts.map((a) => [a._id, a]));
  const categoryMap = new Map(categories.map((c) => [c._id, c]));

  const getFilteredTransactions = () => {
    if (!transactions) {
      return null;
    }
    if (!searchQuery) {
      return transactions;
    }
    return transactions.filter((tx) =>
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredTransactions = getFilteredTransactions();

  const transactionCount = filteredTransactions?.length ?? 0;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Transactions</h1>
          <p className="text-muted-foreground text-sm">
            View, filter, and manage all your transactions
          </p>
        </div>
        <CreateTransactionDialog accounts={accounts} categories={categories} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions ? `${transactionCount} transactions` : "Loading…"}
          </CardDescription>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                weight="bold"
              />
              <Input
                className="pl-9"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                value={searchQuery}
              />
            </div>
            <Tabs onValueChange={(v) => setFilter(v as typeof filter)} value={filter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="expense">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="transfer">Transfers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {!filteredTransactions && <TransactionsTableSkeleton />}
          {filteredTransactions && filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FunnelIcon className="h-12 w-12 text-muted-foreground" weight="bold" />
              <p className="mt-4 text-muted-foreground">No transactions found</p>
              {accounts.length > 0 ? (
                <CreateTransactionDialog accounts={accounts} categories={categories}>
                  <Button className="mt-4" variant="outline">
                    <PlusIcon className="mr-2" data-icon="inline-start" />
                    Add your first transaction
                  </Button>
                </CreateTransactionDialog>
              ) : (
                <p className="mt-2 text-muted-foreground text-sm">
                  Create an account first to add transactions
                </p>
              )}
            </div>
          )}
          {filteredTransactions && filteredTransactions.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => {
                  const account = accountMap.get(tx.accountId);
                  const category = categoryMap.get(tx.categoryId);

                  return (
                    <TransactionRow
                      account={account}
                      categories={categories}
                      category={category}
                      key={tx._id}
                      transaction={tx}
                    />
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
