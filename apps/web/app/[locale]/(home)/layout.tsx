import { MarketingFooter } from '@/components/layout/marketing-footer'
import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <MarketingFooter className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 overflow-hidden max-h-[900px]" />
    </div>
  )
}
