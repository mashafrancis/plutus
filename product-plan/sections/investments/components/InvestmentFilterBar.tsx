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
import type { InvestmentsFilters, FilterOptions, AssetType, GainLossFilter } from '../types'

interface InvestmentFilterBarProps {
  filters?: InvestmentsFilters
  filterOptions: FilterOptions
  onFilterChange?: (filters: InvestmentsFilters) => void
}

export function InvestmentFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: InvestmentFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleAssetTypeChange = (assetType: AssetType) => {
    onFilterChange?.({
      ...filters,
      assetType: filters?.assetType === assetType ? undefined : assetType,
    })
  }

  const handleAccountChange = (accountId: string) => {
    onFilterChange?.({
      ...filters,
      account: filters?.account === accountId ? undefined : accountId,
    })
  }

  const handleGainLossStatusChange = (status: GainLossFilter) => {
    onFilterChange?.({
      ...filters,
      gainLossStatus: filters?.gainLossStatus === status ? undefined : status,
    })
  }

  const handleSearchChange = (search: string) => {
    onFilterChange?.({
      ...filters,
      search: search || undefined,
    })
  }

  const clearFilters = () => {
    onFilterChange?.({})
  }

  const activeFilterCount = [
    filters?.assetType,
    filters?.account,
    filters?.gainLossStatus,
    filters?.search,
  ].filter(Boolean).length

  const selectedAssetType = filters?.assetType
  const selectedAccount = filters?.account
  const selectedGainLossStatus = filters?.gainLossStatus

  const formatAssetType = (type: AssetType) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatGainLossStatus = (status: GainLossFilter) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getAccountName = (accountId: string) => {
    return filterOptions.accounts.find(a => a.id === accountId)?.name || accountId
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
        {/* Asset Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedAssetType ? formatAssetType(selectedAssetType) : 'Asset Type'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.assetTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedAssetType === type}
                onCheckedChange={() => handleAssetTypeChange(type)}
                className="font-geist-sans"
              >
                {formatAssetType(type)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedAccount ? getAccountName(selectedAccount) : 'Account'} <ChevronDown className="ml-2 h-4 w-4" />
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

        {/* Gain/Loss Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-geist-sans">
              {selectedGainLossStatus ? formatGainLossStatus(selectedGainLossStatus) : 'Gain/Loss'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.gainLossStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedGainLossStatus === status}
                onCheckedChange={() => handleGainLossStatusChange(status)}
                className="font-geist-sans"
              >
                {formatGainLossStatus(status)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search investments..."
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
      {(selectedAssetType || selectedAccount || selectedGainLossStatus) && (
        <div className="flex flex-wrap gap-2">
          {selectedAssetType && (
            <Badge variant="secondary" className="font-geist-sans">
              Type: {formatAssetType(selectedAssetType)}
              <button
                onClick={() => handleAssetTypeChange(selectedAssetType)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedAccount && (
            <Badge variant="secondary" className="font-geist-sans">
              Account: {getAccountName(selectedAccount)}
              <button
                onClick={() => handleAccountChange(selectedAccount)}
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedGainLossStatus && (
            <Badge variant="secondary" className="font-geist-sans">
              Status: {formatGainLossStatus(selectedGainLossStatus)}
              <button
                onClick={() => handleGainLossStatusChange(selectedGainLossStatus)}
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

