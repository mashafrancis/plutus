import { HouseIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ActivityPopover } from "@/widgets/activity-feed/ui/activity-popover";
import { NotificationPopover } from "@/widgets/notification-popover/ui/notification-popover";

// Map of routes to their display names
const ROUTE_NAMES: Record<string, string> = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  accounts: "Accounts",
  goals: "Goals",
  investments: "Investments",
  subscriptions: "Subscriptions",
  settings: "Settings",
};

interface BreadcrumbSegment {
  name: string;
  path: string;
  isCurrentPage: boolean;
}

function getBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments: BreadcrumbSegment[] = [];

  // Handle root path
  if (pathname === "/" || pathname === "/dashboard") {
    return [{ name: "Dashboard", path: "/dashboard", isCurrentPage: true }];
  }

  // Split path and filter empty segments
  const pathParts = pathname.split("/").filter(Boolean);

  // Build breadcrumb segments
  let currentPath = "";
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === pathParts.length - 1;
    const name =
      ROUTE_NAMES[part] || part.charAt(0).toUpperCase() + part.slice(1);

    segments.push({
      name,
      path: currentPath,
      isCurrentPage: isLast,
    });
  });

  return segments;
}

export function Navbar() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex flex-1 items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home icon link - always shown for non-dashboard pages */}
            {breadcrumbs[0]?.path !== "/dashboard" && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link aria-label="Go to dashboard" to="/dashboard" />
                    }
                  >
                    <HouseIcon aria-hidden weight="bold" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {/* Breadcrumb segments */}
            {breadcrumbs.map((segment, index) => (
              <BreadcrumbItem key={segment.path}>
                {index > 0 && <BreadcrumbSeparator />}
                {segment.isCurrentPage ? (
                  <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link to={segment.path} />}>
                    {segment.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <NotificationPopover />
        <ActivityPopover />
      </div>
    </header>
  );
}
