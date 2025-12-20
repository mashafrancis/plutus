import { Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { AccountRow } from './AccountRow'
import { CategoryRow } from './CategoryRow'
import { TagRow } from './TagRow'
import type { Account, Category, Tag } from '../types'

interface FinancialTabProps {
  accounts: Account[]
  categories: Category[]
  tags: Tag[]
  onAddAccount?: () => void
  onEditAccount?: (accountId: string) => void
  onDeleteAccount?: (accountId: string) => void
  onArchiveAccount?: (accountId: string, archived: boolean) => void
  onSetDefaultAccount?: (accountId: string) => void
  onUpdateAccountBalance?: (accountId: string, balance: number) => void
  onAddCategory?: () => void
  onEditCategory?: (categoryId: string) => void
  onDeleteCategory?: (categoryId: string) => void
  onArchiveCategory?: (categoryId: string, archived: boolean) => void
  onAddTag?: () => void
  onEditTag?: (tagId: string) => void
  onDeleteTag?: (tagId: string) => void
  onMergeTags?: (sourceTagId: string, targetTagId: string) => void
}

export function FinancialTab({
  accounts,
  categories,
  tags,
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
}: FinancialTabProps) {
  const activeAccounts = accounts.filter(a => !a.isArchived)
  const archivedAccounts = accounts.filter(a => a.isArchived)
  const activeCategories = categories.filter(c => !c.isArchived)
  const archivedCategories = categories.filter(c => c.isArchived)
  
  // Build category hierarchy
  const rootCategories = activeCategories.filter(c => c.parentId === null)
  const getChildren = (parentId: string) => activeCategories.filter(c => c.parentId === parentId)

  return (
    <div className="space-y-6">
      {/* Accounts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Accounts
            </CardTitle>
            <Button
              onClick={onAddAccount}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAccounts.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4 font-geist-sans">
              No accounts yet. Add your first account to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {activeAccounts.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  onEdit={onEditAccount}
                  onDelete={onDeleteAccount}
                  onArchive={onArchiveAccount}
                  onSetDefault={onSetDefaultAccount}
                  onUpdateBalance={onUpdateAccountBalance}
                />
              ))}
            </div>
          )}
          
          {archivedAccounts.length > 0 && (
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3 font-geist-sans">
                Archived Accounts
              </h3>
              <div className="space-y-2">
                {archivedAccounts.map((account) => (
                  <AccountRow
                    key={account.id}
                    account={account}
                    onEdit={onEditAccount}
                    onDelete={onDeleteAccount}
                    onArchive={onArchiveAccount}
                    onSetDefault={onSetDefaultAccount}
                    onUpdateBalance={onUpdateAccountBalance}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Categories
            </CardTitle>
            <Button
              onClick={onAddCategory}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCategories.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4 font-geist-sans">
              No categories yet. Add your first category to organize transactions.
            </p>
          ) : (
            <div className="space-y-2">
              {rootCategories.map((category) => (
                <div key={category.id}>
                  <CategoryRow
                    category={category}
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                    onArchive={onArchiveCategory}
                  />
                  {getChildren(category.id).map((child) => (
                    <div key={child.id} className="ml-6 mt-2">
                      <CategoryRow
                        category={child}
                        onEdit={onEditCategory}
                        onDelete={onDeleteCategory}
                        onArchive={onArchiveCategory}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
          {archivedCategories.length > 0 && (
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3 font-geist-sans">
                Archived Categories
              </h3>
              <div className="space-y-2">
                {archivedCategories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                    onArchive={onArchiveCategory}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tags Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Tags
            </CardTitle>
            <Button
              onClick={onAddTag}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4 font-geist-sans">
              No tags yet. Add tags to better organize your transactions.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {tags.map((tag) => (
                <TagRow
                  key={tag.id}
                  tag={tag}
                  allTags={tags}
                  onEdit={onEditTag}
                  onDelete={onDeleteTag}
                  onMerge={onMergeTags}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

