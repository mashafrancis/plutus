import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Account, Category, Tag } from "@/lib/types/settings";
import { AccountRow } from "./AccountRow";
import { CategoryRow } from "./CategoryRow";
import { TagRow } from "./TagRow";

interface FinancialTabProps {
  accounts: Account[];
  categories: Category[];
  tags: Tag[];
  onAddAccount?: () => void;
  onEditAccount?: (accountId: string) => void;
  onDeleteAccount?: (accountId: string) => void;
  onArchiveAccount?: (accountId: string, archived: boolean) => void;
  onSetDefaultAccount?: (accountId: string) => void;
  onUpdateAccountBalance?: (accountId: string, balance: number) => void;
  onAddCategory?: () => void;
  onEditCategory?: (categoryId: string) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onArchiveCategory?: (categoryId: string, archived: boolean) => void;
  onAddTag?: () => void;
  onEditTag?: (tagId: string) => void;
  onDeleteTag?: (tagId: string) => void;
  onMergeTags?: (sourceTagId: string, targetTagId: string) => void;
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
  const activeAccounts = accounts.filter((a) => !a.isArchived);
  const archivedAccounts = accounts.filter((a) => a.isArchived);
  const activeCategories = categories.filter((c) => !c.isArchived);
  const archivedCategories = categories.filter((c) => c.isArchived);

  // Build category hierarchy
  const rootCategories = activeCategories.filter((c) => c.parentId === null);
  const getChildren = (parentId: string) =>
    activeCategories.filter((c) => c.parentId === parentId);

  return (
    <div className="space-y-6">
      {/* Accounts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Accounts
            </CardTitle>
            <Button
              className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
              onClick={onAddAccount}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAccounts.length === 0 ? (
            <p className="py-4 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
              No accounts yet. Add your first account to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {activeAccounts.map((account) => (
                <AccountRow
                  account={account}
                  key={account.id}
                  onArchive={onArchiveAccount}
                  onDelete={onDeleteAccount}
                  onEdit={onEditAccount}
                  onSetDefault={onSetDefaultAccount}
                  onUpdateBalance={onUpdateAccountBalance}
                />
              ))}
            </div>
          )}

          {archivedAccounts.length > 0 && (
            <div className="mt-6 border-neutral-200 border-t pt-6 dark:border-neutral-800">
              <h3 className="mb-3 font-geist-sans font-medium text-neutral-600 text-sm dark:text-neutral-400">
                Archived Accounts
              </h3>
              <div className="space-y-2">
                {archivedAccounts.map((account) => (
                  <AccountRow
                    account={account}
                    key={account.id}
                    onArchive={onArchiveAccount}
                    onDelete={onDeleteAccount}
                    onEdit={onEditAccount}
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
            <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Categories
            </CardTitle>
            <Button
              className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
              onClick={onAddCategory}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCategories.length === 0 ? (
            <p className="py-4 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
              No categories yet. Add your first category to organize
              transactions.
            </p>
          ) : (
            <div className="space-y-2">
              {rootCategories.map((category) => (
                <div key={category.id}>
                  <CategoryRow
                    category={category}
                    onArchive={onArchiveCategory}
                    onDelete={onDeleteCategory}
                    onEdit={onEditCategory}
                  />
                  {getChildren(category.id).map((child) => (
                    <div className="mt-2 ml-6" key={child.id}>
                      <CategoryRow
                        category={child}
                        onArchive={onArchiveCategory}
                        onDelete={onDeleteCategory}
                        onEdit={onEditCategory}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {archivedCategories.length > 0 && (
            <div className="mt-6 border-neutral-200 border-t pt-6 dark:border-neutral-800">
              <h3 className="mb-3 font-geist-sans font-medium text-neutral-600 text-sm dark:text-neutral-400">
                Archived Categories
              </h3>
              <div className="space-y-2">
                {archivedCategories.map((category) => (
                  <CategoryRow
                    category={category}
                    key={category.id}
                    onArchive={onArchiveCategory}
                    onDelete={onDeleteCategory}
                    onEdit={onEditCategory}
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
            <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Tags
            </CardTitle>
            <Button
              className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
              onClick={onAddTag}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <p className="py-4 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
              No tags yet. Add tags to better organize your transactions.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => (
                <TagRow
                  allTags={tags}
                  key={tag.id}
                  onDelete={onDeleteTag}
                  onEdit={onEditTag}
                  onMerge={onMergeTags}
                  tag={tag}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
