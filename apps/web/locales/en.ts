export default {
  language: {
    title: 'Languages',
    description: 'Change the language used in the user interface.',
    placeholder: 'Select language',
  },
  languages: {
    en: 'English',
    sv: 'Swedish',
  },
  spending_period: {
    last_30d: 'Last 30 days',
    this_month: 'This month',
    last_month: 'Last month',
    this_year: 'This year',
    last_year: 'Last year',
  },
  transactions_period: {
    all: 'All',
    income: 'Income',
    expense: 'Expense',
  },
  inbox_filter: {
    all: 'All',
    todo: 'Todo',
    done: 'Done',
  },
  roles: {
    owner: 'Owner',
    member: 'Member',
  },
  notifications: {
    inbox: 'Receive notifications about new items in your inbox.',
    match: 'Receive notifications about matches.',
    transaction: 'Receive notifications about a new transaction.',
    transactions: 'Receive notifications about new transactions.',
  },
  bottom_bar: {
    'transactions#one': '1 Transaction',
    'transactions#other': '{count} Transactions',
    multi_currency: 'Multi currency',
    description: 'Includes transactions from all pages of results',
  },
} as const
