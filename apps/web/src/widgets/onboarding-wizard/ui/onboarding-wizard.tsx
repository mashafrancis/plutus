import { CheckIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import StepAccounts from "./step-accounts";
import StepCategories from "./step-categories";
import StepComplete from "./step-complete";
import StepTransactions from "./step-transactions";
import StepWelcome from "./step-welcome";

const STEPS = [
  { id: 0, title: "Welcome", component: StepWelcome },
  { id: 1, title: "Accounts", component: StepAccounts },
  { id: 2, title: "Categories", component: StepCategories },
  { id: 3, title: "Transactions", component: StepTransactions },
  { id: 4, title: "Complete", component: StepComplete },
];

interface OnboardingWizardProps {
  initialStep?: number;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingWizard({
  initialStep = 0,
  onComplete,
  onSkip,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isOpen, setIsOpen] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const updateSettings = useMutation(api.userSettings.update);

  const handleNext = async () => {
    const nextStep = currentStep + 1;

    // Save progress
    await updateSettings({ onboardingStep: nextStep });

    if (nextStep >= STEPS.length) {
      // Mark onboarding as complete
      await updateSettings({
        onboardingCompleted: true,
        onboardingStep: STEPS.length,
      });
      setIsOpen(false);
      onComplete();
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = async () => {
    const prevStep = Math.max(0, currentStep - 1);
    await updateSettings({ onboardingStep: prevStep });
    setCurrentStep(prevStep);
  };

  const handleSkip = async () => {
    await updateSettings({
      onboardingCompleted: true,
      onboardingStep: STEPS.length,
    });
    setIsOpen(false);
    onSkip();
  };

  const handleClose = async () => {
    // Save current step for resumability
    await updateSettings({ onboardingStep: currentStep });
    setIsOpen(false);
    onSkip();
  };

  const CurrentStepComponent = STEPS[currentStep]?.component || StepWelcome;

  const getStepClassName = (index: number) => {
    if (index < currentStep) {
      return "border-primary bg-primary text-primary-foreground";
    }
    if (index === currentStep) {
      return "border-primary bg-background text-primary";
    }
    return "border-muted bg-background text-muted-foreground";
  };

  return (
    <Dialog onOpenChange={(open) => !open && handleClose()} open={isOpen}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col gap-0 p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl">
            Get Started with Plutus
          </DialogTitle>
          <DialogDescription>
            Let's set up your financial tracking in just a few steps
          </DialogDescription>
        </DialogHeader>

        {/* Progress Stepper - Fixed */}
        <div className="flex items-center justify-center px-6 py-6">
          <div className="flex w-full max-w-2xl items-center">
            {STEPS.map((step, index) => (
              <div
                className={cn(
                  "flex items-center",
                  index < STEPS.length - 1 && "flex-1"
                )}
                key={step.id}
              >
                <div className="flex flex-col items-center">
                  <button
                    aria-label={`Go to onboarding step ${index + 1}: ${step.title}`}
                    className={`flex size-10 items-center justify-center rounded-full border-2 transition-[background-color,color,border-color,transform] ${getStepClassName(
                      index
                    )} ${index < currentStep ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
                    disabled={index >= currentStep}
                    onClick={async () => {
                      if (index < currentStep) {
                        await updateSettings({ onboardingStep: index });
                        setCurrentStep(index);
                      }
                    }}
                    type="button"
                  >
                    {index < currentStep ? (
                      <CheckIcon aria-hidden className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold text-sm">{index + 1}</span>
                    )}
                  </button>
                  <span
                    className={`mt-2 text-xs ${
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 transition-colors ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[620px] overflow-y-auto px-6 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="min-h-[300px]"
              exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
              key={currentStep}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <CurrentStepComponent
                onNext={handleNext}
                onPrevious={currentStep > 0 ? handlePrevious : undefined}
                onSkip={handleSkip}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Footer - Navigation for steps 1-3 */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <div className="flex items-center justify-between border-t px-6 py-4">
            <Button onClick={handlePrevious} variant="outline">
              Previous
            </Button>
            <Button onClick={handleNext} variant="default">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
