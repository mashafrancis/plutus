'use server'

import { updateUser } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { revalidateTag } from 'next/cache'
import { authActionClient } from './safe-action'
import { updateUserSchema } from './schema'

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .action(async ({ parsedInput: params }) => {
    const supabase = await createClient()
    const user = await updateUser(supabase, params)

    revalidateTag(`user_${user?.data?.id}`)

    return user
  })
