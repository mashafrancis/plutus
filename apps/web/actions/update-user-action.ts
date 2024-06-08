'use server'

import { updateUser } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { revalidateTag } from 'next/cache'
import { action } from './safe-action'
import { updateUserSchema } from './schema'

export const updateUserAction = action(updateUserSchema, async (data) => {
  const supabase = createClient()
  const user = await updateUser(supabase, data)

  revalidateTag(`user_${user?.data?.id}`)

  return user
})
