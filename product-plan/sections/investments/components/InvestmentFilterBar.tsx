import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import type {
  AssetType,
  FilterOptions,
  GainLossFilter,
  InvestmentsFilters,
} from "../types";
import { cn } from "./utils";

interface InvestmentFilterBarProps {
  filters?: InvestmentsFilters;
  filterOptions: FilterOptions;
  onFilterChange?: (filters: InvestmentsFilters) => void;
}

export function InvestmentFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: InvestmentFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleAssetTypeChange = (assetType: AssetType) => {
    onFilterChange?.({
      ...filters,
      assetType: filters?.assetType === assetType ? undefined : assetType,
    });
  };

  const handleAccountChange = (accountId: string) => {
    onFilterChange?.({
      ...filters,
      account: filters?.account === accountId ? undefined : accountId,
    });
  };

  const handleGainLossStatusChange = (status: GainLossFilter) => {
    onFilterChange?.({
      ...filters,
      gainLossStatus: filters?.gainLossStatus === status ? undefined : status,
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange?.({
      ...filters,
      search: search || undefined,
    });
  };

  const clearFilters = () => {
    onFilterChange?.({});
  };

  const activeFilterCount = [
    filters?.assetType,
    filters?.account,
    filters?.gainLossStatus,
    filters?.search,
  ].filter(Boolean).length;

  const selectedAssetType = filters?.assetType;
  const selectedAccount = filters?.account;
  const selectedGainLossStatus = filters?.gainLossStatus;

  const formatAssetType = (type: AssetType) =>
    type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formatGainLossStatus = (status: GainLossFilter) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const getAccountName = (accountId: string) =>
    filterOptions.accounts.find((a) => a.id === accountId)?.name || accountId;

  return (
    <div className="space-y-4">
      {/* Mobile: Collapsible filter button */}
      <div className="lg:hidden">
        <Button
          className="w-full justify-between"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          variant="outline"
        >
          <span className="font-geist-sans">Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="ml-2" variant="secondary">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isMobileFiltersOpen && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Filter controls */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          !isMobileFiltersOpen && "hidden lg:flex"
        )}
      >
        {/* Asset Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-geist-sans" variant="outline">
              {selectedAssetType
                ? formatAssetType(selectedAssetType)
                : "Asset Type"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.assetTypes.map((type) => (
              <DropdownMenuCheckboxItem
                checked={selectedAssetType === type}
                className="font-geist-sans"
                key={type}
                onCheckedChange={() => handleAssetTypeChange(type)}
              >
                {formatAssetType(type)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-geist-sans" variant="outline">
              {selectedAccount ? getAccountName(selectedAccount) : "Account"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.accounts.map((account) => (
              <DropdownMenuCheckboxItem
                checked={selectedAccount === account.id}
                className="font-geist-sans"
                key={account.id}
                onCheckedChange={() => handleAccountChange(account.id)}
              >
                {account.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Gain/Loss Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-geist-sans" variant="outline">
              {selectedGainLossStatus
                ? formatGainLossStatus(selectedGainLossStatus)
                : "Gain/Loss"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.gainLossStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                checked={selectedGainLossStatus === status}
                className="font-geist-sans"
                key={status}
                onCheckedChange={() => handleGainLossStatusChange(status)}
              >
                {formatGainLossStatus(status)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            className="pl-9 font-geist-sans"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search investments..."
            type="text"
            value={filters?.search || ""}
          />
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            className="font-geist-sans"
            onClick={clearFilters}
            size="sm"
            variant="ghost"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {(selectedAssetType || selectedAccount || selectedGainLossStatus) && (
        <div className="flex flex-wrap gap-2">
          {selectedAssetType && (
            <Badge className="font-geist-sans" variant="secondary">
              Type: {formatAssetType(selectedAssetType)}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleAssetTypeChange(selectedAssetType)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedAccount && (
            <Badge className="font-geist-sans" variant="secondary">
              Account: {getAccountName(selectedAccount)}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleAccountChange(selectedAccount)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedGainLossStatus && (
            <Badge className="font-geist-sans" variant="secondary">
              Status: {formatGainLossStatus(selectedGainLossStatus)}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() =>
                  handleGainLossStatusChange(selectedGainLossStatus)
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
