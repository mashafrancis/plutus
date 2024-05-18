export type NAVIGATION =
  | NAVIGATION_SHORTNAMES.OVERVIEW
  | NAVIGATION_SHORTNAMES.INCOME
  | NAVIGATION_SHORTNAMES.EXPENSES
  | NAVIGATION_SHORTNAMES.INVESTMENTS
  | NAVIGATION_SHORTNAMES.SUBSCRIPTIONS

export enum NAVIGATION_NAMES {
  OVERVIEW = 'Overview',
  INCOME = 'Income',
  EXPENSES = 'Expenses',
  INVESTMENTS = 'Investments',
  SUBSCRIPTIONS = 'Subscriptions',
}

export enum NAVIGATION_SHORTNAMES {
  OVERVIEW = 'overview',
  INCOME = 'income',
  EXPENSES = 'expenses',
  INVESTMENTS = 'investments',
  SUBSCRIPTIONS = 'subscriptions',
}

export interface WebsiteProps {
  name: NAVIGATION_NAMES
}

export type Navigation = {
  [website in NAVIGATION]: WebsiteProps
}

export const navigation: Navigation = {
  overview: {
    name: NAVIGATION_NAMES.OVERVIEW,
  },
  income: {
    name: NAVIGATION_NAMES.INCOME,
  },
  expenses: {
    name: NAVIGATION_NAMES.EXPENSES,
  },
  investments: {
    name: NAVIGATION_NAMES.INVESTMENTS,
  },
  subscriptions: {
    name: NAVIGATION_NAMES.SUBSCRIPTIONS,
  },
}
