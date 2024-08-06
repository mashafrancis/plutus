'use server'

import { revalidateTag } from 'next/cache'
import { authActionClient } from './safe-action'
import { deleteExpensesSchema } from './schema'

export const deleteExpensesAction = authActionClient
  .schema(deleteExpensesSchema)
  .metadata({
    name: 'delete-expenses',
  })
  .action(async ({ parsedInput: { ids }, ctx: { user, supabase } }) => {
    await supabase.from('expenses').delete().in('id', ids).is('manual', true)

    revalidateTag(`expenses_${user?.id}`)
  })
