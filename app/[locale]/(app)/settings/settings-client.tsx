"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Settings } from "@/components/settings";
import type { SettingsData, SettingsTab } from "@/lib/types/settings";
import { pushModal, showConfirm } from "@/modals";
import { useTRPC } from "@/trpc/react";

interface SettingsClientProps {
  initialData: SettingsData;
  currency?: string;
  locale?: string;
}

export function SettingsClient({
  initialData,
  currency = "USD",
  locale = "en-US",
}: SettingsClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Parse active tab from URL params
  const activeTab =
    (searchParams.get("tab") as SettingsTab) || ("financial" as SettingsTab);

  const { data: settingsData = initialData } = useQuery(
    trpc.settings.getData.queryOptions(
      {},
      {
        initialData,
        refetchOnMount: false,
      }
    )
  );

  // Account mutations
  const deleteAccount = useMutation(
    trpc.settings.deleteAccount.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const archiveAccount = useMutation(
    trpc.settings.archiveAccount.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const setDefaultAccount = useMutation(
    trpc.settings.setDefaultAccount.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const updateAccountBalance = useMutation(
    trpc.settings.updateAccountBalance.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Category mutations
  const deleteCategory = useMutation(
    trpc.settings.deleteCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const archiveCategory = useMutation(
    trpc.settings.archiveCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Tag mutations
  const deleteTag = useMutation(
    trpc.settings.deleteTag.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const mergeTags = useMutation(
    trpc.settings.mergeTags.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Budget mutations
  const deleteBudget = useMutation(
    trpc.settings.deleteBudget.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const updateBudget = useMutation(
    trpc.settings.updateBudget.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Preferences mutation
  const updatePreferences = useMutation(
    trpc.settings.updatePreferences.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Profile mutation
  const updateProfile = useMutation(
    trpc.settings.updateProfile.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  // Data management mutations
  const exportData = useMutation(
    trpc.settings.exportData.mutationOptions({
      onSuccess: () => {
        // Handle export success (download file, etc.)
      },
    })
  );

  const importData = useMutation(
    trpc.settings.importData.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
      },
    })
  );

  const deleteAllData = useMutation(
    trpc.settings.deleteAllData.mutationOptions({
      onSuccess: () => {
        // Redirect to home after deletion
        router.push("/");
      },
    })
  );

  const handleTabChange = (tab: SettingsTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/settings?${params.toString()}`);
  };

  const handleAddAccount = () => {
    pushModal("account", {});
  };

  const handleEditAccount = (accountId: string) => {
    pushModal("account", { accountId });
  };

  const handleDeleteAccount = (accountId: string) => {
    showConfirm({
      title: "Delete Account",
      description:
        "Are you sure you want to delete this account? This action cannot be undone.",
      onConfirm: () => {
        deleteAccount.mutate(accountId);
      },
    });
  };

  const handleArchiveAccount = (accountId: string, archived: boolean) => {
    archiveAccount.mutate({ id: accountId, archived });
  };

  const handleSetDefaultAccount = (accountId: string) => {
    setDefaultAccount.mutate({ id: accountId });
  };

  const handleUpdateAccountBalance = (accountId: string, balance: number) => {
    // Open a modal or inline edit for balance update
    updateAccountBalance.mutate({
      id: accountId,
      balance: balance.toString(),
    });
  };

  const handleAddCategory = () => {
    pushModal("category", {});
  };

  const handleEditCategory = (categoryId: string) => {
    pushModal("category", { categoryId });
  };

  const handleDeleteCategory = (categoryId: string) => {
    showConfirm({
      title: "Delete Category",
      description:
        "Are you sure you want to delete this category? This action cannot be undone.",
      onConfirm: () => {
        deleteCategory.mutate(categoryId);
      },
    });
  };

  const handleArchiveCategory = (categoryId: string, archived: boolean) => {
    archiveCategory.mutate({ id: categoryId, archived });
  };

  const handleAddTag = () => {
    pushModal("tag", {});
  };

  const handleEditTag = (tagId: string) => {
    pushModal("tag", { tagId });
  };

  const handleDeleteTag = (tagId: string) => {
    showConfirm({
      title: "Delete Tag",
      description:
        "Are you sure you want to delete this tag? This action cannot be undone.",
      onConfirm: () => {
        deleteTag.mutate(tagId);
      },
    });
  };

  const handleMergeTags = (sourceTagId: string, targetTagId: string) => {
    showConfirm({
      title: "Merge Tags",
      description:
        "Are you sure you want to merge these tags? All transactions using the source tag will be updated to use the target tag.",
      onConfirm: () => {
        mergeTags.mutate({ sourceTagId, targetTagId });
      },
    });
  };

  const handleAddBudget = () => {
    pushModal("budget", {});
  };

  const handleEditBudget = (budgetId: string) => {
    pushModal("budget", { budgetId });
  };

  const handleDeleteBudget = (budgetId: string) => {
    showConfirm({
      title: "Delete Budget",
      description:
        "Are you sure you want to delete this budget? This action cannot be undone.",
      onConfirm: () => {
        deleteBudget.mutate(budgetId);
      },
    });
  };

  const handleUpdateBudget = (
    budgetId: string,
    updates: Partial<SettingsData["budgets"][0]>
  ) => {
    updateBudget.mutate({
      id: budgetId,
      ...updates,
    });
  };

  const handleUpdatePreferences = (
    updates: Partial<SettingsData["preferences"]>
  ) => {
    // Transform preferences structure to match service schema
    const serviceUpdates: Record<string, unknown> = {};
    if (updates.theme !== undefined) serviceUpdates.theme = updates.theme;
    if (updates.currency !== undefined)
      serviceUpdates.currency = updates.currency;
    if (updates.dateFormat !== undefined)
      serviceUpdates.dateFormat = updates.dateFormat;
    if (updates.emailNotifications) {
      serviceUpdates.emailNotificationsEnabled =
        updates.emailNotifications.enabled;
      serviceUpdates.emailBudgetAlerts =
        updates.emailNotifications.budgetAlerts;
      serviceUpdates.emailSubscriptionReminders =
        updates.emailNotifications.subscriptionReminders;
      serviceUpdates.emailWeeklySummary =
        updates.emailNotifications.weeklySummary;
      serviceUpdates.emailMonthlyReport =
        updates.emailNotifications.monthlyReport;
    }
    if (updates.inAppNotifications) {
      serviceUpdates.inAppNotificationsEnabled =
        updates.inAppNotifications.enabled;
      serviceUpdates.inAppBudgetAlerts =
        updates.inAppNotifications.budgetAlerts;
      serviceUpdates.inAppSubscriptionReminders =
        updates.inAppNotifications.subscriptionReminders;
      serviceUpdates.inAppInsights = updates.inAppNotifications.insights;
    }
    if (updates.subscriptionReminderDays !== undefined)
      serviceUpdates.subscriptionReminderDays =
        updates.subscriptionReminderDays;
    if (updates.enabledInsights !== undefined)
      serviceUpdates.enabledInsights = updates.enabledInsights;

    updatePreferences.mutate(serviceUpdates);
  };

  const handleUpdateProfile = (updates: Partial<SettingsData["profile"]>) => {
    updateProfile.mutate(updates);
  };

  const handleExportData = (
    format: "csv" | "json" | "pdf",
    options?: { dateRange?: { from: string; to: string }; sections?: string[] }
  ) => {
    exportData.mutate({ format, ...options });
  };

  const handleImportData = (format: "csv" | "json", file: File) => {
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      importData.mutate({ format, file: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAllData = () => {
    showConfirm({
      title: "Delete All Data",
      description:
        "This will permanently delete all your data including expenses, income, subscriptions, investments, and settings. This action cannot be undone. Are you absolutely sure?",
      onConfirm: () => {
        deleteAllData.mutate();
      },
    });
  };

  return (
    <Settings
      activeTab={activeTab}
      data={settingsData}
      onAddAccount={handleAddAccount}
      onAddBudget={handleAddBudget}
      onAddCategory={handleAddCategory}
      onAddTag={handleAddTag}
      onArchiveAccount={handleArchiveAccount}
      onArchiveCategory={handleArchiveCategory}
      onDeleteAccount={handleDeleteAccount}
      onDeleteAllData={handleDeleteAllData}
      onDeleteBudget={handleDeleteBudget}
      onDeleteCategory={handleDeleteCategory}
      onDeleteTag={handleDeleteTag}
      onEditAccount={handleEditAccount}
      onEditBudget={handleEditBudget}
      onEditCategory={handleEditCategory}
      onEditTag={handleEditTag}
      onExportData={handleExportData}
      onImportData={handleImportData}
      onMergeTags={handleMergeTags}
      onSetDefaultAccount={handleSetDefaultAccount}
      onTabChange={handleTabChange}
      onUpdateAccountBalance={handleUpdateAccountBalance}
      onUpdateBudget={handleUpdateBudget}
      onUpdatePreferences={handleUpdatePreferences}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}
