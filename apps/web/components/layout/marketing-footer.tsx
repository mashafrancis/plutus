import SectionContainer from '@/components/layout/section-container'
import { StatusWidget } from '@/components/status-widget'
import Link from 'next/link'
import { Icons } from '../icons'

export function MarketingFooter() {
  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-[#fff] dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <SectionContainer className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
        <Link href="/" className="scale-150 md:ml-0">
          <Icons.logo className="h-10 w-10" />
        </Link>

        <div className="text-right">
          <StatusWidget />
        </div>
      </SectionContainer>
      <h5 className="dark:text-[#161616] text-[#F4F4F3] text-[500px] leading-none text-center pointer-events-none">
        plutus
      </h5>
    </footer>
  )
}
