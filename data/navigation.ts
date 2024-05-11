import { NAVIGATION_NAMES, NAVIGATION_SHORTNAMES } from '@/types/navigation'

const solutions = {
  [NAVIGATION_SHORTNAMES.OVERVIEW]: {
    name: NAVIGATION_NAMES.OVERVIEW,
    description: 'Monitor and analyze frontend performance.',
    description_short: 'Monitor and analyze frontend performance.',
    label: '',
    url: '/app',
  },
  [NAVIGATION_SHORTNAMES.INCOME]: {
    name: NAVIGATION_NAMES.INCOME,
    description: 'Monitor your infrastructure with deep insights.',
    description_short: 'Monitor your infrastructure.',
    label: '',
    url: '/app/income',
  },
  [NAVIGATION_SHORTNAMES.EXPENSES]: {
    name: NAVIGATION_NAMES.EXPENSES,
    description: 'Monitor your infrastructure with deep insights.',
    description_short: 'Monitor your infrastructure.',
    label: '',
    url: '/app/expenses',
  },
  [NAVIGATION_SHORTNAMES.INVESTMENTS]: {
    name: NAVIGATION_NAMES.INVESTMENTS,
    description: 'Monitor your infrastructure with deep insights.',
    description_short: 'Monitor your infrastructure.',
    label: '',
    url: '/app/investments',
  },
  [NAVIGATION_SHORTNAMES.SUBSCRIPTIONS]: {
    name: NAVIGATION_NAMES.SUBSCRIPTIONS,
    description: 'Monitor your infrastructure with deep insights.',
    description_short: 'Monitor your infrastructure.',
    label: '',
    url: '/app/subscriptions',
  },
}

export default solutions
