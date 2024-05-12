import MarketingHeader from '@/components/layout/marketing-header'
import HighlightColumns from '@/components/sections/highlight-columns'
import { page } from '@/data/home/page'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <MarketingHeader
      {...page.heroSection}
      footer={
        <HighlightColumns highlights={page.highlightsSection.highlights} />
      }
      session={data.user}
    />
  )
}
