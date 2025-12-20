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
import type { SubscriptionsFilters, FilterOptions, SubscriptionStatus, BillingCycle } from '../types'

interface SubscriptionFilterBarProps {
  filters?: SubscriptionsFilters
  filterOptions: FilterOptions
  onFilterChange?: (filters: SubscriptionsFilters) => void
}

export function SubscriptionFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: SubscriptionFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    onFilterChange?.({
      ...filters,
      category: filters?.category === category ? undefined : category,
    })
  }

  const handleStatusChange = (status: SubscriptionStatus) => {
    onFilterChange?.({
      ...filters,
      status: filters?.status === status ? undefined : status,
    })
  }

  const handleBillingCycleChange = (billingCycle: BillingCycle) => {
    onFilterChange?.({
      ...filters,
      billingCycle: filters?.billingCycle === billingCycle ? undefined : billingCycle,
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
    filters?.status,
    filters?.billingCycle,
    filters?.search,
    filters?.amountRange?.min,
    filters?.amountRange?.max,
  ].filter(Boolean).length

  const selectedCategory = filters?.category
  const selectedStatus = filters?.status
  const selectedBillingCycle = filters?.billingCycle

  const formatStatus = (status: SubscriptionStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const formatBillingCycle = (cycle: BillingCycle) => {
    return cycle.charAt(0).toUpperCase() + cycle.slice(1)
  }

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

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedStatus ? formatStatus(selectedStatus) : 'Status'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatus === status}
                onCheckedChange={() => handleStatusChange(status)}
                className="font-geist-sans"
              >
                {formatStatus(status)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Billing Cycle Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedBillingCycle ? formatBillingCycle(selectedBillingCycle) : 'Billing Cycle'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.billingCycles.map((cycle) => (
              <DropdownMenuCheckboxItem
                key={cycle}
                checked={selectedBillingCycle === cycle}
                onCheckedChange={() => handleBillingCycleChange(cycle)}
                className="font-geist-sans"
              >
                {formatBillingCycle(cycle)}
              </DropdownMenuCheckboxItem>
            ))}
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
            placeholder="Search subscriptions..."
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
      {(selectedCategory || selectedStatus || selectedBillingCycle) && (
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
          {selectedStatus && (
            <Badge variant="secondary" className="font-geist-sans">
              Status: {formatStatus(selectedStatus)}
              <button
                onClick={() => handleStatusChange(selectedStatus)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedBillingCycle && (
            <Badge variant="secondary" className="font-geist-sans">
              Billing: {formatBillingCycle(selectedBillingCycle)}
              <button
                onClick={() => handleBillingCycleChange(selectedBillingCycle)}
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

