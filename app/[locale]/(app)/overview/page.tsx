import type { Metadata } from "next";
import type { SearchParams } from "nuqs";
import { getQueryClient, trpc } from "@/trpc/server";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your financial overview at a glance",
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: Props) {
  const queryClient = getQueryClient();
  const searchParams = await props.searchParams;
  const timeframe = (searchParams.timeframe as string) || "month";

  const [user, dashboardData] = await Promise.all([
    queryClient.fetchQuery(trpc.users.me.queryOptions()),
    queryClient.fetchQuery(
      trpc.dashboard.getData.queryOptions({
        timeframe: timeframe as any,
      })
    ),
  ]);

  return (
    <DashboardClient
      currency={user?.currency || "USD"}
      initialData={dashboardData}
      locale={user?.locale || "en-US"}
      timeframe={timeframe as any}
    />
  );
}
