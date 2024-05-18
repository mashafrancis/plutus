import { Metadata } from 'next'

import { Fragment } from 'react'

import Account from '@/app/(app)/settings/_components/account'
import DeleteAccount from '@/app/(app)/settings/_components/delete-account'
import Plans from '@/app/(app)/settings/_components/plans'
import Theme from '@/app/(app)/settings/_components/theme'
import Usage from '@/app/(app)/settings/_components/usage'
import AppHeader from '@/components/app-header'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Plutus finance tracker.',
}

export default function Investments() {
  return (
    <Fragment>
      <AppHeader title="Settings" />
      <div className="mt-6 w-full overflow-x-auto pt-3">
        <div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-2 md:space-y-6">
          <Account />
          <Theme />
          <Usage />
          <Plans />
          <DeleteAccount />
        </div>
      </div>
    </Fragment>
  )
}
