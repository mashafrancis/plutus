'use server'

import { updateUser } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { revalidateTag } from 'next/cache'
import { actionClient } from './safe-action'

export const incrementUsageAction = actionClient.action(async () => {
  const supabase = await createClient()
  const user = await updateUser(supabase, {
    usage: 6,
  })

  revalidateTag(`user_${user?.data?.id}`)

  return user
})
