import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs'
import { FinancialTab } from './FinancialTab'
import { BudgetsTab } from './BudgetsTab'
import { GeneralTab } from './GeneralTab'
import type { SettingsProps, SettingsTab } from '../types'

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
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialActiveTab || 'financial')

  const handleTabChange = (value: string) => {
    const tab = value as SettingsTab
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 font-geist-sans">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-geist-sans">
        Settings
      </h1>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="financial" className="font-geist-sans">
            Financial
          </TabsTrigger>
          <TabsTrigger value="budgets" className="font-geist-sans">
            Budgets
          </TabsTrigger>
          <TabsTrigger value="general" className="font-geist-sans">
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="mt-6">
          <FinancialTab
            accounts={data.accounts}
            categories={data.categories}
            tags={data.tags}
            onAddAccount={onAddAccount}
            onEditAccount={onEditAccount}
            onDeleteAccount={onDeleteAccount}
            onArchiveAccount={onArchiveAccount}
            onSetDefaultAccount={onSetDefaultAccount}
            onUpdateAccountBalance={onUpdateAccountBalance}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            onArchiveCategory={onArchiveCategory}
            onAddTag={onAddTag}
            onEditTag={onEditTag}
            onDeleteTag={onDeleteTag}
            onMergeTags={onMergeTags}
          />
        </TabsContent>

        <TabsContent value="budgets" className="mt-6">
          <BudgetsTab
            budgets={data.budgets}
            categories={data.categories}
            onAddBudget={onAddBudget}
            onEditBudget={onEditBudget}
            onDeleteBudget={onDeleteBudget}
            onUpdateBudget={onUpdateBudget}
          />
        </TabsContent>

        <TabsContent value="general" className="mt-6">
          <GeneralTab
            preferences={data.preferences}
            profile={data.profile}
            onUpdatePreferences={onUpdatePreferences}
            onUpdateProfile={onUpdateProfile}
            onExportData={onExportData}
            onImportData={onImportData}
            onDeleteAllData={onDeleteAllData}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

