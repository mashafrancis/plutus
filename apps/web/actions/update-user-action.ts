'use server'

import { updateUser } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { revalidateTag } from 'next/cache'
import { actionClient } from './safe-action'
import { updateUserSchema } from './schema'

export const updateUserAction = actionClient
  .schema(updateUserSchema)
  .action(async ({ parsedInput: params }) => {
    const supabase = createClient()
    const user = await updateUser(supabase, params)

    revalidateTag(`user_${user?.data?.id}`)

    return user
  })
