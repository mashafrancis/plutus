import { getSession } from '@/app/supabase-server'
import MarketingHeader from '@/components/layout/marketing-header'
import HighlightColumns from '@/components/sections/highlight-columns'
import { page } from '@/data/home/page'

export default async function HomePage() {
  const [session] = await Promise.all([getSession()])

  return (
    <MarketingHeader
      {...page.heroSection}
      footer={
        <HighlightColumns highlights={page.highlightsSection.highlights} />
      }
      session={session}
    />
  )
}
