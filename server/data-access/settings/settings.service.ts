import { Decimal } from "@prisma/client/runtime/library";
import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  Account,
  Budget,
  Category,
  Preferences,
  Profile,
  Tag,
} from "@/lib/types/settings";
import type {
  ArchiveAccountSchema,
  ArchiveCategorySchema,
  CreateAccountSchema,
  CreateBudgetSchema,
  CreateCategorySchema,
  CreateTagSchema,
  MergeTagsSchema,
  SetDefaultAccountSchema,
  UpdateAccountBalanceSchema,
  UpdateAccountSchema,
  UpdateBudgetSchema,
  UpdateCategorySchema,
  UpdatePreferencesSchema,
  UpdateProfileSchema,
  UpdateTagSchema,
} from "@/server/data-access/settings/settings.schema";

export class SettingsService extends Effect.Service<SettingsService>()(
  "SettingsService",
  {
    effect: Effect.gen(function* () {
      return {
        // Account Operations
        getAccounts: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const accounts = yield* execute(
              db.financialAccount.findMany({
                where: { userId },
                orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
              })
            );

            return accounts.map(
              (acc): Account => ({
                id: acc.id,
                name: acc.name,
                type: acc.type as Account["type"],
                currentBalance: Number(acc.currentBalance),
                isDefault: acc.isDefault,
                isArchived: acc.isArchived,
                notes: acc.notes || undefined,
              })
            );
          }),

        createAccount: ({
          name,
          type,
          currentBalance,
          currency,
          notes,
          userId,
        }: CreateAccountSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.financialAccount.create({
                data: {
                  name,
                  type,
                  currentBalance: new Decimal(currentBalance),
                  currency: currency || "USD",
                  notes,
                  userId,
                },
              })
            );
          }),

        updateAccount: ({
          id,
          name,
          type,
          currentBalance,
          currency,
          notes,
          isDefault,
          isArchived,
        }: UpdateAccountSchema) =>
          Effect.gen(function* () {
            const updateData: Record<string, unknown> = {};
            if (name !== undefined) updateData.name = name;
            if (type !== undefined) updateData.type = type;
            if (currentBalance !== undefined)
              updateData.currentBalance = new Decimal(currentBalance);
            if (currency !== undefined) updateData.currency = currency;
            if (notes !== undefined) updateData.notes = notes;
            if (isArchived !== undefined) updateData.isArchived = isArchived;
            if (isDefault !== undefined) updateData.isDefault = isDefault;

            return yield* execute(
              db.financialAccount.update({
                where: { id },
                data: updateData,
              })
            );
          }),

        deleteAccount: ({ id }: { id: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.financialAccount.delete({ where: { id } })
            );
          }),

        archiveAccount: ({ id, archived }: ArchiveAccountSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.financialAccount.update({
                where: { id },
                data: { isArchived: archived },
              })
            );
          }),

        setDefaultAccount: ({ id }: SetDefaultAccountSchema) =>
          Effect.gen(function* () {
            // First, unset all default accounts for this user
            const account = yield* execute(
              db.financialAccount.findUnique({ where: { id } })
            );
            if (!account) {
              return yield* Effect.fail(new Error("Account not found"));
            }

            yield* execute(
              db.financialAccount.updateMany({
                where: { userId: account.userId, isDefault: true },
                data: { isDefault: false },
              })
            );

            // Then set this account as default
            return yield* execute(
              db.financialAccount.update({
                where: { id },
                data: { isDefault: true },
              })
            );
          }),

        updateAccountBalance: ({ id, balance }: UpdateAccountBalanceSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.financialAccount.update({
                where: { id },
                data: { currentBalance: new Decimal(balance) },
              })
            );
          }),

        // Category Operations
        getCategories: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const categories = yield* execute(
              db.category.findMany({
                where: { userId },
                orderBy: [{ parentId: "asc" }, { name: "asc" }],
              })
            );

            return categories.map(
              (cat): Category => ({
                id: cat.id,
                name: cat.name,
                icon: cat.icon || "circle",
                color: cat.color || "neutral",
                type: cat.type as Category["type"],
                parentId: cat.parentId,
                isArchived: cat.isArchived,
                isDefault: cat.isDefault,
                notes: cat.notes || undefined,
              })
            );
          }),

        createCategory: ({
          name,
          icon,
          color,
          type,
          parentId,
          notes,
          userId,
        }: CreateCategorySchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.category.create({
                data: {
                  name,
                  icon: icon || "circle",
                  color: color || "neutral",
                  type,
                  parentId: parentId || null,
                  notes,
                  userId,
                },
              })
            );
          }),

        updateCategory: ({
          id,
          name,
          icon,
          color,
          type,
          parentId,
          notes,
        }: UpdateCategorySchema) =>
          Effect.gen(function* () {
            const updateData: Record<string, unknown> = {};
            if (name !== undefined) updateData.name = name;
            if (icon !== undefined) updateData.icon = icon;
            if (color !== undefined) updateData.color = color;
            if (type !== undefined) updateData.type = type;
            if (parentId !== undefined) updateData.parentId = parentId || null;
            if (notes !== undefined) updateData.notes = notes;

            return yield* execute(
              db.category.update({
                where: { id },
                data: updateData,
              })
            );
          }),

        deleteCategory: ({ id }: { id: string }) =>
          Effect.gen(function* () {
            return yield* execute(db.category.delete({ where: { id } }));
          }),

        archiveCategory: ({ id, archived }: ArchiveCategorySchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.category.update({
                where: { id },
                data: { isArchived: archived },
              })
            );
          }),

        // Tag Operations
        getTags: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const tags = yield* execute(
              db.tag.findMany({
                where: { userId },
                include: {
                  expenses: true,
                  incomeEntries: true,
                },
                orderBy: { name: "asc" },
              })
            );

            return tags.map(
              (tag): Tag => ({
                id: tag.id,
                name: tag.name,
                usageCount: tag.expenses.length + tag.incomeEntries.length,
              })
            );
          }),

        createTag: ({ name, userId }: CreateTagSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.tag.create({
                data: {
                  name,
                  userId,
                },
              })
            );
          }),

        updateTag: ({ id, name }: UpdateTagSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.tag.update({
                where: { id },
                data: { name },
              })
            );
          }),

        deleteTag: ({ id }: { id: string }) =>
          Effect.gen(function* () {
            return yield* execute(db.tag.delete({ where: { id } }));
          }),

        mergeTags: ({ sourceTagId, targetTagId }: MergeTagsSchema) =>
          Effect.gen(function* () {
            // Update all ExpenseTag records
            const expenseTags = yield* execute(
              db.expenseTag.findMany({
                where: { tagId: sourceTagId },
              })
            );

            for (const expenseTag of expenseTags) {
              // Check if target tag already exists for this expense
              const existing = yield* execute(
                db.expenseTag.findUnique({
                  where: {
                    expenseId_tagId: {
                      expenseId: expenseTag.expenseId,
                      tagId: targetTagId,
                    },
                  },
                })
              );

              if (existing) {
                // Delete duplicate
                yield* execute(
                  db.expenseTag.delete({ where: { id: expenseTag.id } })
                );
              } else {
                // Update to target tag
                yield* execute(
                  db.expenseTag.update({
                    where: { id: expenseTag.id },
                    data: { tagId: targetTagId },
                  })
                );
              }
            }

            // Update all IncomeTag records
            const incomeTags = yield* execute(
              db.incomeTag.findMany({
                where: { tagId: sourceTagId },
              })
            );

            for (const incomeTag of incomeTags) {
              // Check if target tag already exists for this income
              const existing = yield* execute(
                db.incomeTag.findUnique({
                  where: {
                    incomeId_tagId: {
                      incomeId: incomeTag.incomeId,
                      tagId: targetTagId,
                    },
                  },
                })
              );

              if (existing) {
                // Delete duplicate
                yield* execute(
                  db.incomeTag.delete({ where: { id: incomeTag.id } })
                );
              } else {
                // Update to target tag
                yield* execute(
                  db.incomeTag.update({
                    where: { id: incomeTag.id },
                    data: { tagId: targetTagId },
                  })
                );
              }
            }

            // Delete source tag
            return yield* execute(
              db.tag.delete({ where: { id: sourceTagId } })
            );
          }),

        // Budget Operations
        getBudgets: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const budgets = yield* execute(
              db.budget.findMany({
                where: { userId },
                include: {
                  user: {
                    select: {
                      expenses: {
                        select: {
                          price: true,
                          categoryId: true,
                          date: true,
                        },
                      },
                    },
                  },
                },
              })
            );

            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();

            return yield* Effect.all(
              budgets.map((budget) =>
                Effect.gen(function* () {
                  // Calculate current spending for the period
                  let periodStart: Date;
                  const periodEnd: Date = new Date();

                  switch (budget.period) {
                    case "monthly":
                      periodStart = new Date(currentYear, currentMonth, 1);
                      break;
                    case "weekly": {
                      const dayOfWeek = now.getDay();
                      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                      periodStart = new Date(now);
                      periodStart.setDate(now.getDate() - daysToMonday);
                      periodStart.setHours(0, 0, 0, 0);
                      break;
                    }
                    case "quarterly": {
                      const quarter = Math.floor(currentMonth / 3);
                      periodStart = new Date(currentYear, quarter * 3, 1);
                      break;
                    }
                    case "yearly":
                      periodStart = new Date(currentYear, 0, 1);
                      break;
                    default:
                      periodStart = new Date(currentYear, currentMonth, 1);
                  }

                  const periodStartStr = periodStart
                    .toISOString()
                    .split("T")[0];
                  const periodEndStr = periodEnd.toISOString().split("T")[0];

                  const relevantExpenses = budget.user.expenses.filter(
                    (exp) => {
                      const expDate = exp.date;
                      const matchesDate =
                        expDate >= periodStartStr && expDate <= periodEndStr;
                      const matchesCategory = budget.categoryId
                        ? exp.categoryId === budget.categoryId
                        : true; // Overall budget
                      return matchesDate && matchesCategory;
                    }
                  );

                  const currentSpending = relevantExpenses.reduce(
                    (sum, exp) => sum + Number(exp.price),
                    0
                  );

                  // Get category name
                  let categoryName = "Overall";
                  if (budget.categoryId) {
                    const category = yield* execute(
                      db.category.findUnique({
                        where: { id: budget.categoryId },
                      })
                    );
                    categoryName = category?.name || "Unknown";
                  }

                  return {
                    id: budget.id,
                    categoryId: budget.categoryId,
                    categoryName,
                    limit: Number(budget.limit),
                    currentSpending,
                    period: budget.period as Budget["period"],
                    rolloverEnabled: budget.rolloverEnabled,
                    recurringEnabled: budget.recurringEnabled,
                    alertThreshold: budget.alertThreshold,
                    alertThresholdType:
                      budget.alertThresholdType as Budget["alertThresholdType"],
                  } satisfies Budget;
                })
              )
            );
          }),

        createBudget: ({
          categoryId,
          limit,
          period,
          rolloverEnabled,
          recurringEnabled,
          alertThreshold,
          alertThresholdType,
          userId,
        }: CreateBudgetSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.budget.create({
                data: {
                  categoryId: categoryId || null,
                  limit: new Decimal(limit),
                  period,
                  rolloverEnabled: rolloverEnabled ?? false,
                  recurringEnabled: recurringEnabled ?? true,
                  alertThreshold: alertThreshold ?? 80,
                  alertThresholdType: alertThresholdType || "percentage",
                  userId,
                },
              })
            );
          }),

        updateBudget: ({
          id,
          categoryId,
          limit,
          period,
          rolloverEnabled,
          recurringEnabled,
          alertThreshold,
          alertThresholdType,
        }: UpdateBudgetSchema) =>
          Effect.gen(function* () {
            const updateData: Record<string, unknown> = {};
            if (categoryId !== undefined)
              updateData.categoryId = categoryId || null;
            if (limit !== undefined) updateData.limit = new Decimal(limit);
            if (period !== undefined) updateData.period = period;
            if (rolloverEnabled !== undefined)
              updateData.rolloverEnabled = rolloverEnabled;
            if (recurringEnabled !== undefined)
              updateData.recurringEnabled = recurringEnabled;
            if (alertThreshold !== undefined)
              updateData.alertThreshold = alertThreshold;
            if (alertThresholdType !== undefined)
              updateData.alertThresholdType = alertThresholdType;

            return yield* execute(
              db.budget.update({
                where: { id },
                data: updateData,
              })
            );
          }),

        deleteBudget: ({ id }: { id: string }) =>
          Effect.gen(function* () {
            return yield* execute(db.budget.delete({ where: { id } }));
          }),

        // Preferences Operations
        getPreferences: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            let prefs = yield* execute(
              db.preferences.findUnique({
                where: { userId },
              })
            );

            // Create default preferences if they don't exist
            if (!prefs) {
              prefs = yield* execute(
                db.preferences.create({
                  data: {
                    userId,
                  },
                })
              );
            }

            return {
              theme: prefs.theme as Preferences["theme"],
              currency: prefs.currency as Preferences["currency"],
              dateFormat: prefs.dateFormat as Preferences["dateFormat"],
              emailNotifications: {
                enabled: prefs.emailNotificationsEnabled,
                budgetAlerts: prefs.emailBudgetAlerts,
                subscriptionReminders: prefs.emailSubscriptionReminders,
                weeklySummary: prefs.emailWeeklySummary,
                monthlyReport: prefs.emailMonthlyReport,
              },
              inAppNotifications: {
                enabled: prefs.inAppNotificationsEnabled,
                budgetAlerts: prefs.inAppBudgetAlerts,
                subscriptionReminders: prefs.inAppSubscriptionReminders,
                insights: prefs.inAppInsights,
              },
              subscriptionReminderDays: prefs.subscriptionReminderDays,
              enabledInsights:
                prefs.enabledInsights as Preferences["enabledInsights"],
            } satisfies Preferences;
          }),

        updatePreferences: ({
          theme,
          currency,
          dateFormat,
          emailNotificationsEnabled,
          emailBudgetAlerts,
          emailSubscriptionReminders,
          emailWeeklySummary,
          emailMonthlyReport,
          inAppNotificationsEnabled,
          inAppBudgetAlerts,
          inAppSubscriptionReminders,
          inAppInsights,
          subscriptionReminderDays,
          enabledInsights,
          userId,
        }: UpdatePreferencesSchema & { userId: string }) =>
          Effect.gen(function* () {
            const updateData: Record<string, unknown> = {};
            if (theme !== undefined) updateData.theme = theme;
            if (currency !== undefined) updateData.currency = currency;
            if (dateFormat !== undefined) updateData.dateFormat = dateFormat;
            if (emailNotificationsEnabled !== undefined)
              updateData.emailNotificationsEnabled = emailNotificationsEnabled;
            if (emailBudgetAlerts !== undefined)
              updateData.emailBudgetAlerts = emailBudgetAlerts;
            if (emailSubscriptionReminders !== undefined)
              updateData.emailSubscriptionReminders =
                emailSubscriptionReminders;
            if (emailWeeklySummary !== undefined)
              updateData.emailWeeklySummary = emailWeeklySummary;
            if (emailMonthlyReport !== undefined)
              updateData.emailMonthlyReport = emailMonthlyReport;
            if (inAppNotificationsEnabled !== undefined)
              updateData.inAppNotificationsEnabled = inAppNotificationsEnabled;
            if (inAppBudgetAlerts !== undefined)
              updateData.inAppBudgetAlerts = inAppBudgetAlerts;
            if (inAppSubscriptionReminders !== undefined)
              updateData.inAppSubscriptionReminders =
                inAppSubscriptionReminders;
            if (inAppInsights !== undefined)
              updateData.inAppInsights = inAppInsights;
            if (subscriptionReminderDays !== undefined)
              updateData.subscriptionReminderDays = subscriptionReminderDays;
            if (enabledInsights !== undefined)
              updateData.enabledInsights = enabledInsights;

            // Upsert preferences
            return yield* execute(
              db.preferences.upsert({
                where: { userId },
                create: {
                  userId,
                  ...updateData,
                },
                update: updateData,
              })
            );
          }),

        // Profile Operations
        getProfile: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const user = yield* execute(
              db.user.findUnique({
                where: { id: userId },
                select: {
                  name: true,
                  email: true,
                  image: true,
                },
              })
            );

            if (!user) {
              return yield* Effect.fail(new Error("User not found"));
            }

            return {
              name: user.name,
              email: user.email,
              avatarUrl: user.image,
            } satisfies Profile;
          }),

        updateProfile: ({
          name,
          email,
          avatarUrl,
          userId,
        }: UpdateProfileSchema & { userId: string }) =>
          Effect.gen(function* () {
            const updateData: Record<string, unknown> = {};
            if (name !== undefined) updateData.name = name;
            if (email !== undefined) updateData.email = email;
            if (avatarUrl !== undefined) updateData.image = avatarUrl;

            return yield* execute(
              db.user.update({
                where: { id: userId },
                data: updateData,
              })
            );
          }),

        // Data Operations
        exportData: ({
          format,
          dateRange,
          sections,
          userId,
        }: {
          format: "csv" | "json" | "pdf";
          dateRange?: { from?: string; to?: string };
          sections?: string[];
          userId: string;
        }) =>
          Effect.gen(function* () {
            // This is a placeholder - actual export logic would be implemented here
            // For now, return a success indicator
            return { format, dateRange, sections };
          }),

        importData: ({
          format,
          file,
          userId,
        }: {
          format: "csv" | "json";
          file: string; // base64 encoded
          userId: string;
        }) =>
          Effect.gen(function* () {
            // This is a placeholder - actual import logic would be implemented here
            return { format, success: true };
          }),

        deleteAllData: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            // Delete user (cascades to all related data)
            return yield* execute(db.user.delete({ where: { id: userId } }));
          }),
      };
    }),
  }
) {}
