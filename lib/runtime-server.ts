import { Layer, ManagedRuntime } from "effect";
import { DashboardService } from "@/server/data-access/dashboard/dashboard.service";
import { ExpensesService } from "@/server/data-access/expenses/expenses.service";
import { IncomeService } from "@/server/data-access/income/income.service";
import { InsightsService } from "@/server/data-access/insights/insights.service";
import { InvestmentsService } from "@/server/data-access/investments/investments.service";
import { SubscriptionsService } from "@/server/data-access/subscriptions/subscriptions.service";
import { UsersService } from "@/server/data-access/users/users.service";

const MainLayer = Layer.mergeAll(
  DashboardService.Default,
  ExpensesService.Default,
  IncomeService.Default,
  InsightsService.Default,
  InvestmentsService.Default,
  SubscriptionsService.Default,
  UsersService.Default
);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
