'use server'

import { updateExpense } from '@plutus/supabase/mutations'
import { revalidateTag } from 'next/cache'
import { authActionClient } from './safe-action'
import { updateExpenseSchema } from './schema'

export const updateExpenseAction = authActionClient
  .schema(updateExpenseSchema)
  .metadata({
    name: 'update-expense',
  })
  .action(
    async ({ parsedInput: { id, ...payload }, ctx: { user, supabase } }) => {
      const { data } = await updateExpense(supabase, id, payload)

      revalidateTag(`expenses_${user?.id}`)

      return data
    },
  )
