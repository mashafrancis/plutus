import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import type { SettingsProps, SettingsTab } from "../types";
import { BudgetsTab } from "./BudgetsTab";
import { FinancialTab } from "./FinancialTab";
import { GeneralTab } from "./GeneralTab";

export function Settings({
  data,
  activeTab: initialActiveTab,
  onTabChange,
  onAddAccount,
  onEditAccount,
  onDeleteAccount,
  onArchiveAccount,
  onSetDefaultAccount,
  onUpdateAccountBalance,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onArchiveCategory,
  onAddTag,
  onEditTag,
  onDeleteTag,
  onMergeTags,
  onAddBudget,
  onEditBudget,
  onDeleteBudget,
  onUpdateBudget,
  onUpdatePreferences,
  onUpdateProfile,
  onExportData,
  onImportData,
  onDeleteAllData,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    initialActiveTab || "financial"
  );

  const handleTabChange = (value: string) => {
    const tab = value as SettingsTab;
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="container mx-auto space-y-6 p-6 font-geist-sans">
      <h1 className="font-bold font-geist-sans text-3xl text-neutral-900 dark:text-neutral-100">
        Settings
      </h1>

      <Tabs
        className="w-full"
        onValueChange={handleTabChange}
        value={activeTab}
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger className="font-geist-sans" value="financial">
            Financial
          </TabsTrigger>
          <TabsTrigger className="font-geist-sans" value="budgets">
            Budgets
          </TabsTrigger>
          <TabsTrigger className="font-geist-sans" value="general">
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="financial">
          <FinancialTab
            accounts={data.accounts}
            categories={data.categories}
            onAddAccount={onAddAccount}
            onAddCategory={onAddCategory}
            onAddTag={onAddTag}
            onArchiveAccount={onArchiveAccount}
            onArchiveCategory={onArchiveCategory}
            onDeleteAccount={onDeleteAccount}
            onDeleteCategory={onDeleteCategory}
            onDeleteTag={onDeleteTag}
            onEditAccount={onEditAccount}
            onEditCategory={onEditCategory}
            onEditTag={onEditTag}
            onMergeTags={onMergeTags}
            onSetDefaultAccount={onSetDefaultAccount}
            onUpdateAccountBalance={onUpdateAccountBalance}
            tags={data.tags}
          />
        </TabsContent>

        <TabsContent className="mt-6" value="budgets">
          <BudgetsTab
            budgets={data.budgets}
            categories={data.categories}
            onAddBudget={onAddBudget}
            onDeleteBudget={onDeleteBudget}
            onEditBudget={onEditBudget}
            onUpdateBudget={onUpdateBudget}
          />
        </TabsContent>

        <TabsContent className="mt-6" value="general">
          <GeneralTab
            onDeleteAllData={onDeleteAllData}
            onExportData={onExportData}
            onImportData={onImportData}
            onUpdatePreferences={onUpdatePreferences}
            onUpdateProfile={onUpdateProfile}
            preferences={data.preferences}
            profile={data.profile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
