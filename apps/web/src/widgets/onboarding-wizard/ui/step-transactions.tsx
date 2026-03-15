import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useCategoriesList } from "@/entities/category/api/use-categories-list";
import { useTransactionsList } from "@/entities/transaction/api/use-transactions-list";

export default function StepTransactions() {
  const { data: accounts } = useAccountsList();
  const { data: categories } = useCategoriesList();
  const { data: transactions } = useTransactionsList();
  const createTransaction = useMutation(api.transactions.create);
  const removeTransaction = useMutation(api.transactions.remove);

  const [accountId, setAccountId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!(accountId && categoryId && amount && description)) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAdding(true);
    try {
      const account = accounts?.find((a) => a._id === accountId);
      if (!account) {
        toast.error("Invalid account");
        return;
      }

      await createTransaction({
        accountId: accountId as Id<"accounts">,
        categoryId: categoryId as Id<"categories">,
        type,
        amount: Number.parseFloat(amount),
        currency: account.currency,
        description: description.trim(),
        date: new Date(date).getTime(),
      });

      setAmount("");
      setDescription("");
      toast.success("Transaction added!");
    } catch (_error) {
      toast.error("Failed to add transaction");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: Id<"transactions">) => {
    try {
      await removeTransaction({ id });
      toast.success("Transaction removed");
    } catch (_error) {
      toast.error("Failed to remove transaction");
    }
  };

  const recentTransactions = transactions?.slice(0, 5) || [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-lg">
          Add recent transactions (Optional)
        </h3>
        <p className="text-muted-foreground text-sm">
          Add some recent transactions to get started. You can skip this step
          and add them later.
        </p>
      </div>

      {/* Add Transaction Form */}
      <div className="flex flex-col gap-4 rounded-md border p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-account">Account</Label>
            <Select
              items={accounts?.map((acc) => ({
                value: acc._id,
                label: acc.name,
              }))}
              onValueChange={(value) => value && setAccountId(value)}
              value={accountId}
            >
              <SelectTrigger className="w-full" id="tx-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts?.map((acc) => (
                  <SelectItem key={acc._id} value={acc._id}>
                    {acc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-category">Category</Label>
            <Select
              items={categories?.map((cat) => ({
                value: cat._id,
                label: `${cat.icon} ${cat.name}`,
              }))}
              onValueChange={(value) => value && setCategoryId(value)}
              value={categoryId}
            >
              <SelectTrigger className="w-full" id="tx-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem
                    key={cat._id}
                    label={`${cat.icon} ${cat.name}`}
                    value={cat._id}
                  >
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-type">Type</Label>
            <Select
              items={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" },
              ]}
              onValueChange={(v) => setType(v as "expense" | "income")}
              value={type}
            >
              <SelectTrigger className="w-full" id="tx-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-amount">Amount</Label>
            <Input
              id="tx-amount"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              value={amount}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-description">Description</Label>
            <Input
              id="tx-description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Grocery shopping"
              value={description}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tx-date">Date</Label>
            <Input
              id="tx-date"
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
          </div>
        </div>

        <Button
          className="w-full"
          disabled={isAdding || !accounts || accounts.length === 0}
          onClick={handleAdd}
        >
          <PlusIcon className="mr-2" data-icon="inline-start" />
          Add Transaction
        </Button>
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label>Recent Transactions ({recentTransactions.length})</Label>
          <div className="flex flex-col gap-2">
            {recentTransactions.map((tx) => (
              <div
                className="flex items-center justify-between rounded-md border p-3"
                key={tx._id}
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-muted-foreground text-sm">
                    {tx.type === "income" ? "+" : "-"}
                    {tx.currency} {tx.amount.toFixed(2)}
                  </p>
                </div>
                <Button
                  aria-label={`Delete transaction ${tx.description}`}
                  onClick={() => handleDelete(tx._id)}
                  size="icon"
                  variant="ghost"
                >
                  <TrashIcon aria-hidden weight="bold" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
