import { useState } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Badge } from '../../ui/badge'
import { cn } from './utils'
import type { ExpensesFilters, FilterOptions, RecurringFilter } from '../types'

interface ExpenseFilterBarProps {
  filters?: ExpensesFilters
  filterOptions: FilterOptions
  onFilterChange?: (filters: ExpensesFilters) => void
}

export function ExpenseFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: ExpenseFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    onFilterChange?.({
      ...filters,
      category: filters?.category === category ? undefined : category,
    })
  }

  const handleAccountChange = (accountId: string) => {
    onFilterChange?.({
      ...filters,
      account: filters?.account === accountId ? undefined : accountId,
    })
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = filters?.tags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    onFilterChange?.({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    })
  }

  const handleRecurringChange = (recurring: RecurringFilter) => {
    onFilterChange?.({
      ...filters,
      recurring: filters?.recurring === recurring ? undefined : recurring,
    })
  }

  const handleSearchChange = (search: string) => {
    onFilterChange?.({
      ...filters,
      search: search || undefined,
    })
  }

  const handleAmountRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value ? parseFloat(value) : undefined
    onFilterChange?.({
      ...filters,
      amountRange: {
        ...filters?.amountRange,
        [field]: numValue,
      },
    })
  }

  const clearFilters = () => {
    onFilterChange?.({})
  }

  const activeFilterCount = [
    filters?.category,
    filters?.account,
    filters?.tags?.length,
    filters?.recurring,
    filters?.search,
    filters?.amountRange?.min,
    filters?.amountRange?.max,
  ].filter(Boolean).length

  const selectedCategory = filters?.category
  const selectedAccount = filters?.account
  const selectedTags = filters?.tags || []
  const selectedRecurring = filters?.recurring

  return (
    <div className="space-y-4">
      {/* Mobile: Collapsible filter button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full justify-between"
        >
          <span className="font-geist-sans">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileFiltersOpen && "rotate-180")} />
        </Button>
      </div>

      {/* Filter controls */}
      <div className={cn(
        "flex flex-wrap items-center gap-3",
        !isMobileFiltersOpen && "hidden lg:flex"
      )}>
        {/* Date Range - Placeholder */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              Date Range <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="p-2 text-sm text-neutral-500 dark:text-neutral-400 font-geist-sans">
              Date picker placeholder
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedCategory || 'Category'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategory === category}
                onCheckedChange={() => handleCategoryChange(category)}
                className="font-geist-sans"
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedAccount ? filterOptions.accounts.find(a => a.id === selectedAccount)?.name : 'Account'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.accounts.map((account) => (
              <DropdownMenuCheckboxItem
                key={account.id}
                checked={selectedAccount === account.id}
                onCheckedChange={() => handleAccountChange(account.id)}
                className="font-geist-sans"
              >
                {account.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tags Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 max-h-64 overflow-y-auto">
            {filterOptions.tags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
                className="font-geist-sans"
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Recurring Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedRecurring === 'recurring' ? 'Recurring Only' : selectedRecurring === 'one-time' ? 'One-Time Only' : 'All'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuCheckboxItem
              checked={!selectedRecurring || selectedRecurring === 'all'}
              onCheckedChange={() => handleRecurringChange('all')}
              className="font-geist-sans"
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedRecurring === 'recurring'}
              onCheckedChange={() => handleRecurringChange('recurring')}
              className="font-geist-sans"
            >
              Recurring Only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedRecurring === 'one-time'}
              onCheckedChange={() => handleRecurringChange('one-time')}
              className="font-geist-sans"
            >
              One-Time Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min $"
            value={filters?.amountRange?.min || ''}
            onChange={(e) => handleAmountRangeChange('min', e.target.value)}
            className="w-24 font-geist-mono"
          />
          <span className="text-neutral-500 dark:text-neutral-400 font-geist-sans">-</span>
          <Input
            type="number"
            placeholder="Max $"
            value={filters?.amountRange?.max || ''}
            onChange={(e) => handleAmountRangeChange('max', e.target.value)}
            className="w-24 font-geist-mono"
          />
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search expenses..."
            value={filters?.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 font-geist-sans"
          />
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="font-geist-sans"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {(selectedCategory || selectedAccount || selectedTags.length > 0 || selectedRecurring) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="font-geist-sans">
              Category: {selectedCategory}
              <button
                onClick={() => handleCategoryChange(selectedCategory)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedAccount && (
            <Badge variant="secondary" className="font-geist-sans">
              Account: {filterOptions.accounts.find(a => a.id === selectedAccount)?.name}
              <button
                onClick={() => handleAccountChange(selectedAccount)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-geist-sans">
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedRecurring && selectedRecurring !== 'all' && (
            <Badge variant="secondary" className="font-geist-sans">
              {selectedRecurring === 'recurring' ? 'Recurring' : 'One-Time'}
              <button
                onClick={() => handleRecurringChange(selectedRecurring)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

