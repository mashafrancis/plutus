import MarketingHeader from '@/components/layout/marketing-header'
import HighlightColumns from '@/components/sections/highlight-columns'
import { page } from '@/data/home/page'

export default function HomePage() {
  return (
    <MarketingHeader
      {...page.heroSection}
      footer={
        <HighlightColumns highlights={page.highlightsSection.highlights} />
      }
    />
  )
}
