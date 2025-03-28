'use server'

import { authActionClient } from '@/actions/safe-action'
import { LogEvents } from '@plutus/events/events'
import { setupAnalytics } from '@plutus/events/server'
import { getUser } from '@plutus/supabase/cached-queries'
import { createExpense } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { revalidateTag } from 'next/cache'
import { createExpenseSchema } from './schema'

export const createExpenseAction = authActionClient
  .schema(createExpenseSchema)
  .metadata({
    name: 'create-expense',
  })
  .action(async ({ parsedInput: params }) => {
    const supabase = await createClient()
    const user = await getUser()

    const data = await createExpense(supabase, { ...params })

    revalidateTag(`expenses_${user?.data?.id}`)

    const analytics = await setupAnalytics({
      userId: user?.data?.id,
    })

    analytics.track({
      event: LogEvents.ExpenseCreated.name,
      channel: LogEvents.ExpenseCreated.channel,
    })

    return data
  })
