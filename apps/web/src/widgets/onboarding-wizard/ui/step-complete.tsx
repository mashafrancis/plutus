import { CheckCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useCategoriesList } from "@/entities/category/api/use-categories-list";
import { useTransactionsList } from "@/entities/transaction/api/use-transactions-list";

interface StepCompleteProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export default function StepComplete({ onNext, onPrevious }: StepCompleteProps) {
  const { data: accounts } = useAccountsList();
  const { data: categories } = useCategoriesList();
  const { data: transactions } = useTransactionsList();

  const accountCount = accounts?.length || 0;
  const categoryCount = categories?.length || 0;
  const transactionCount = transactions?.length || 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/10">
        <CheckCircleIcon className="h-10 w-10 text-chart-2" weight="fill" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl">You're all set!</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Your financial tracking is ready to go. Here's what you've set up:
        </p>
      </div>

      <div className="grid w-full max-w-md gap-3 rounded-lg border p-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Accounts</span>
          <span className="font-semibold">{accountCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Categories</span>
          <span className="font-semibold">{categoryCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Transactions</span>
          <span className="font-semibold">{transactionCount}</span>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-center text-left text-muted-foreground text-sm">
        <div className="flex flex-col gap-3">
          <p>✨ Start tracking your expenses and income</p>
          <p>📊 View insights on your dashboard</p>
          <p>🎯 Set financial goals and monitor progress</p>
        </div>
      </div>

      <div className="flex w-full max-w-md gap-3">
        {onPrevious && (
          <Button className="flex-1" onClick={onPrevious} variant="outline">
            Back
          </Button>
        )}
        <Button className="flex-1" onClick={onNext} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
