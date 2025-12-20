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
  BillingCycle,
  FilterOptions,
  SubscriptionStatus,
  SubscriptionsFilters,
} from "@/lib/types/subscriptions";
import { cn } from "./utils";

interface SubscriptionFilterBarProps {
  filters?: SubscriptionsFilters;
  filterOptions: FilterOptions;
  onFilterChange?: (filters: SubscriptionsFilters) => void;
}

export function SubscriptionFilterBar({
  filters = {},
  filterOptions,
  onFilterChange,
}: SubscriptionFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    onFilterChange?.({
      ...filters,
      category: filters?.category === category ? undefined : category,
    });
  };

  const handleStatusChange = (status: SubscriptionStatus) => {
    onFilterChange?.({
      ...filters,
      status: filters?.status === status ? undefined : status,
    });
  };

  const handleBillingCycleChange = (billingCycle: BillingCycle) => {
    onFilterChange?.({
      ...filters,
      billingCycle:
        filters?.billingCycle === billingCycle ? undefined : billingCycle,
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
    filters?.category,
    filters?.status,
    filters?.billingCycle,
    filters?.search,
    filters?.amountRange?.min,
    filters?.amountRange?.max,
  ].filter(Boolean).length;

  const selectedCategory = filters?.category;
  const selectedStatus = filters?.status;
  const selectedBillingCycle = filters?.billingCycle;

  const formatStatus = (status: SubscriptionStatus) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const formatBillingCycle = (cycle: BillingCycle) =>
    cycle.charAt(0).toUpperCase() + cycle.slice(1);

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
        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedCategory || "Category"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.categories.map((category) => (
              <DropdownMenuCheckboxItem
                checked={selectedCategory === category}
                key={category}
                onCheckedChange={() => handleCategoryChange(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedStatus ? formatStatus(selectedStatus) : "Status"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.statuses.map((status) => (
              <DropdownMenuCheckboxItem
                checked={selectedStatus === status}
                key={status}
                onCheckedChange={() => handleStatusChange(status)}
              >
                {formatStatus(status)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Billing Cycle Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedBillingCycle
                ? formatBillingCycle(selectedBillingCycle)
                : "Billing Cycle"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {filterOptions.billingCycles.map((cycle) => (
              <DropdownMenuCheckboxItem
                checked={selectedBillingCycle === cycle}
                key={cycle}
                onCheckedChange={() => handleBillingCycleChange(cycle)}
              >
                {formatBillingCycle(cycle)}
              </DropdownMenuCheckboxItem>
            ))}
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
            placeholder="Search subscriptions..."
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
      {(selectedCategory || selectedStatus || selectedBillingCycle) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary">
              Category: {selectedCategory}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleCategoryChange(selectedCategory)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedStatus && (
            <Badge variant="secondary">
              Status: {formatStatus(selectedStatus)}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleStatusChange(selectedStatus)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedBillingCycle && (
            <Badge variant="secondary">
              Billing: {formatBillingCycle(selectedBillingCycle)}
              <button
                className="ml-2 hover:text-neutral-900 dark:hover:text-neutral-100"
                onClick={() => handleBillingCycleChange(selectedBillingCycle)}
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
