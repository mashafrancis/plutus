import { Icons } from '@/components/icons'
import { AlignLeft, Globe, PieChart, ScanFace } from 'lucide-react'
import dynamic from 'next/dynamic'

const HomeHero = dynamic(() => import('@/components/sections/home-hero'))

export const page = {
  heroSection: {
    // title: 'Plutus',
    icon: Icons.logo,
    h1: 'Unleashing Your Financial IQ',
    subheader: [
      "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.",
    ],
    image: <HomeHero />,
    ctas: [
      {
        label: 'Try it for free',
        href: '/login',
        type: 'primary' as any,
      },
    ],
  },
  highlightsSection: {
    highlights: [
      {
        title: 'Easy to use',
        paragraph: 'Track expenses on-the-go with categorization and logging.',
        svg: (
          <div className="w-12 h-12 p-2 bg-alternative rounded-lg border flex justify-center items-center">
            <Globe className="w-7 h-7 stroke-[1.4px]" />
          </div>
        ),
      },
      {
        title: 'Data-driven insights',
        paragraph:
          'Expense tracker can provide valuable insights into your spending habits, allowing you to make more informed decisions',
        svg: (
          <div className="w-12 h-12 p-2 bg-alternative rounded-lg border flex justify-center items-center">
            <AlignLeft className="w-7 h-7 stroke-[1.4px]" />
          </div>
        ),
      },
      {
        title: 'Identify overspending',
        paragraph:
          'Take control of your finances by identifying and reducing overspending with an expense tracker',
        svg: (
          <div className="w-12 h-12 p-2 bg-alternative rounded-lg border flex justify-center items-center">
            <PieChart className="w-7 h-7 stroke-[1.4px]" />
          </div>
        ),
      },
      {
        title: 'Real-time visibility',
        paragraph:
          'Monitor your expenses in real-time, whether you are at home or on-the-go, with a user-friendly interface',
        svg: (
          <div className="w-12 h-12 p-2 bg-alternative rounded-lg border flex justify-center items-center">
            <ScanFace className="w-7 h-7 stroke-[1.4px]" />
          </div>
        ),
      },
    ],
  },
}
