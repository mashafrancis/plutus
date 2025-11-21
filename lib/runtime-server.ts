import { Layer, ManagedRuntime } from "effect";
import { ExpensesService } from "@/server/data-access/expenses/expenses.service";
import { IncomeService } from "@/server/data-access/income/income.service";
import { InvestmentsService } from "@/server/data-access/investments/investments.service";
import { SubscriptionsService } from "@/server/data-access/subscriptions/subscriptions.service";
import { UsersService } from "@/server/data-access/users/users.service";

const MainLayer = Layer.mergeAll(
  ExpensesService.Default,
  IncomeService.Default,
  InvestmentsService.Default,
  SubscriptionsService.Default,
  UsersService.Default
);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
