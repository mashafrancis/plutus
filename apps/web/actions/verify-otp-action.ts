'use server'

import { Cookies } from '@/lib/constants'
import { createClient } from '@plutus/supabase/server'
import { addYears } from 'date-fns'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { actionClient } from './safe-action'
import { verifyOtpSchema } from './schema'

export const verifyOtpAction = actionClient(
  verifyOtpSchema,
  async ({ email, phone, token, type }) => {
    const supabase = createClient()

    const options =
      type === 'email'
        ? {
            email,
            token,
            type: 'email',
          }
        : {
            phone,
            token,
            type: 'sms',
          }

    // @ts-expect-error
    await supabase.auth.verifyOtp(options)

    cookies().set(Cookies.PreferredSignInProvider, 'otp', {
      expires: addYears(new Date(), 1),
    })

    redirect('/')
  },
)
