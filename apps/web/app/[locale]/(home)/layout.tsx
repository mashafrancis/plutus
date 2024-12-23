import { MarketingFooter } from '@/components/layout/marketing-footer'
import type { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
