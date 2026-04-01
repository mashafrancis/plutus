import { Button } from "@/components/ui/button";

interface StepWelcomeProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function StepWelcome({ onNext, onSkip }: StepWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl">Welcome to Plutus!</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Let's get you set up in just a few minutes. We'll help you add your accounts, customize
          categories, and start tracking your finances.
        </p>
      </div>

      <div className="grid w-full max-w-md gap-3 pt-4 text-left">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-sm">
            1
          </div>
          <div>
            <p className="font-medium">Set up your accounts</p>
            <p className="text-muted-foreground text-sm">
              Add your bank accounts, credit cards, and cash
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-sm">
            2
          </div>
          <div>
            <p className="font-medium">Customize categories</p>
            <p className="text-muted-foreground text-sm">
              Organize your spending with custom categories
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-sm">
            3
          </div>
          <div>
            <p className="font-medium">Add transactions (optional)</p>
            <p className="text-muted-foreground text-sm">
              Import your recent transactions to get started
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-4">
        <Button className="w-full max-w-md" onClick={onNext} size="lg">
          Get Started
        </Button>

        <button
          className="text-xs underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          onClick={onSkip}
          type="button"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
