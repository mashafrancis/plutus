'use server'

import { Cookies } from '@/lib/constants'
import { createClient } from '@plutus/supabase/server'
import { addYears } from 'date-fns'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { actionClient } from './safe-action'
import { verifyOtpSchema } from './schema'

export const verifyOtpAction = actionClient
  .schema(verifyOtpSchema)
  .action(async ({ parsedInput: { email, token } }) => {
    const supabase = await createClient()
    const cookiesList = await cookies()

    // @ts-expect-error
    await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })

    cookiesList.set(Cookies.PreferredSignInProvider, 'otp', {
      expires: addYears(new Date(), 1),
    })

    redirect('/')
  })
