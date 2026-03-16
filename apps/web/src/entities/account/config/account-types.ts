import { CreditCardIcon, PiggyBankIcon, TrendUpIcon, WalletIcon } from "@phosphor-icons/react";
import type { AccountType } from "../types/account-id";

export const ACCOUNT_TYPES: {
  value: AccountType;
  label: string;
  icon: typeof CreditCardIcon;
}[] = [
  { value: "checking", label: "Checking", icon: CreditCardIcon },
  { value: "savings", label: "Savings", icon: PiggyBankIcon },
  { value: "credit", label: "Credit Card", icon: CreditCardIcon },
  { value: "cash", label: "Cash", icon: WalletIcon },
  { value: "investment", label: "Investment", icon: TrendUpIcon },
];
