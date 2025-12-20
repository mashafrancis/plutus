import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type {
  FilterOptions,
  IncomeFilters,
  RecurringFilter,
} from "@/lib/types/income";
import { cn } from "./utils";

interface IncomeFilterBarProps {
  filters?: IncomeFilters;
  filterOptions: FilterOptions;
  onFilterChange?: (filters: IncomeFilters) => void;
}

export function IncomeFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: IncomeFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSourceChange = (source: string) => {
    onFilterChange?.({
      ...filters,
      source: filters?.source === source ? undefined : source,
    });
  };

  const handleAccountChange = (accountId: string) => {
    onFilterChange?.({
      ...filters,
      account: filters?.account === accountId ? undefined : accountId,
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters?.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    onFilterChange?.({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handleRecurringChange = (recurring: RecurringFilter) => {
    onFilterChange?.({
      ...filters,
      recurring: filters?.recurring === recurring ? undefined : recurring,
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange?.({
      ...filters,
      search: search || undefined,
    });
  };

  const handleAmountRangeChange = (field: "min" | "max", value: string) => {
    const numValue = value ? Number.parseFloat(value) : undefined;
    onFilterChange?.({
      ...filters,
      amountRange: {
        ...filters?.amountRange,
        [field]: numValue,
      },
    });
  };

  const clearFilters = () => {
    onFilterChange?.({});
  };

  const activeFilterCount = [
    filters?.source,
    filters?.account,
    filters?.tags?.length,
    filters?.recurring,
    filters?.search,
    filters?.amountRange?.min,
    filters?.amountRange?.max,
  ].filter(Boolean).length;

  const selectedSource = filters?.source;
  const selectedAccount = filters?.account;
  const selectedTags = filters?.tags || [];
  const selectedRecurring = filters?.recurring;

  return (
    <div className="space-y-4">
      {/* Mobile: Collapsible filter button */}
      <div className="lg:hidden">
        <Button
          className="w-full justify-between"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          variant="outline"
        >
          <span>Filters</span>
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
        {/* Date Range - Placeholder */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Date Range <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="p-2 text-neutral-500 text-sm dark:text-neutral-400">
              Date picker placeholder
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Source Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedSource || "Source"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.sources.map((source) => (
              <DropdownMenuCheckboxItem
                checked={selectedSource === source}
                key={source}
                onCheckedChange={() => handleSourceChange(source)}
              >
                {source}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedAccount
                ? filterOptions.accounts.find((a) => a.id === selectedAccount)
                    ?.name
                : "Account"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.accounts.map((account) => (
              <DropdownMenuCheckboxItem
                checked={selectedAccount === account.id}
                key={account.id}
                onCheckedChange={() => handleAccountChange(account.id)}
              >
                {account.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tags Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-64 w-56 overflow-y-auto"
          >
            {filterOptions.tags.map((tag) => (
              <DropdownMenuCheckboxItem
                checked={selectedTags.includes(tag)}
                key={tag}
                onCheckedChange={() => handleTagToggle(tag)}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Recurring Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedRecurring === "recurring"
                ? "Recurring Only"
                : selectedRecurring === "one-time"
                  ? "One-Time Only"
                  : "All"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuCheckboxItem
              checked={!selectedRecurring || selectedRecurring === "all"}
              onCheckedChange={() => handleRecurringChange("all")}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedRecurring === "recurring"}
              onCheckedChange={() => handleRecurringChange("recurring")}
            >
              Recurring Only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedRecurring === "one-time"}
              onCheckedChange={() => handleRecurringChange("one-time")}
            >
              One-Time Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <Input
            className="w-24"
            onChange={(e) => handleAmountRangeChange("min", e.target.value)}
            placeholder="Min $"
            type="number"
            value={filters?.amountRange?.min || ""}
          />
          <span className="text-neutral-500 dark:text-neutral-400">-</span>
          <Input
            className="w-24"
            onChange={(e) => handleAmountRangeChange("max", e.target.value)}
            placeholder="Max $"
            type="number"
            value={filters?.amountRange?.max || ""}
          />
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            className="pl-9"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search income..."
            type="text"
            value={filters?.search || ""}
          />
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button onClick={clearFilters} size="sm" variant="ghost">
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {(selectedSource ||
        selectedAccount ||
        selectedTags.length > 0 ||
        selectedRecurring) && (
        <div className="flex flex-wrap gap-2">
          {selectedSource && (
            <Badge variant="secondary">
              Source: {selectedSource}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleSourceChange(selectedSource)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedAccount && (
            <Badge variant="secondary">
              Account:{" "}
              {
                filterOptions.accounts.find((a) => a.id === selectedAccount)
                  ?.name
              }
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleAccountChange(selectedAccount)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleTagToggle(tag)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedRecurring && selectedRecurring !== "all" && (
            <Badge variant="secondary">
              {selectedRecurring === "recurring" ? "Recurring" : "One-Time"}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleRecurringChange(selectedRecurring)}
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
