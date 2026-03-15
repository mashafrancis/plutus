import HomeHeader from "@/components/home/header";
import HighlightColumns from "@/components/sections/highlight-columns";
import { page } from "@/data/home/page";

export function HomePage() {
  return (
    <HomeHeader
      {...page.heroSection}
      footer={
        <HighlightColumns highlights={page.highlightsSection.highlights} />
      }
    />
  );
}
