'use client'

import { verifyOtpAction } from '@/actions/verify-otp-action'
import { Form } from '@/components/ui-elements/form'
import Input from '@/components/ui-elements/input'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { toFormikValidationSchema } from '@/lib/zod-formik-adapter'
import { createClient } from '@plutus/supabase/client'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  value: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  className?: string
}

export function OTPSignIn({ className }: Props) {
  const verifyOtp = useAction(verifyOtpAction)
  const [isLoading, setLoading] = useState(false)
  const [isSent, setSent] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState<'email' | 'phone'>()
  const supabase = createClient()
  const { isMobile } = useMediaQuery()

  const handleLogin = async ({ value }: FormData) => {
    setLoading(true)

    const isPhone = value.startsWith('+')

    setType(isPhone ? 'phone' : 'email')

    if (isPhone) {
      setPhone(value)
    } else {
      setEmail(value)
    }

    const options = isPhone ? { phone: value } : { email: value }

    await supabase.auth.signInWithOtp(options)

    setSent(true)
    setLoading(false)
  }

  async function onComplete(token: string) {
    if (type) {
      verifyOtp.execute({
        type,
        token,
        phone,
        email,
      })
    }
  }

  if (isSent) {
    return (
      <div className={cn('flex flex-col space-y-4 items-center', className)}>
        <InputOTP
          maxLength={6}
          onComplete={onComplete}
          disabled={verifyOtp.status === 'executing'}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot
                  key={index.toString()}
                  {...slot}
                  className="w-[62px] h-[62px]"
                />
              ))}
            </InputOTPGroup>
          )}
        />

        <button
          onClick={() => setSent(false)}
          type="button"
          className="text-sm"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <Form
      validateOnBlur
      id="signIn-form"
      initialValues={{ value: '' }}
      validationSchema={toFormikValidationSchema(formSchema)}
      onSubmit={handleLogin}
    >
      {() => {
        return (
          <div className="flex flex-col gap-4">
            <Input
              id="phoneoremail"
              name="phone or email"
              placeholder="Enter phone-number or email"
              autoFocus={!isMobile}
              disabled={isLoading}
              autoCapitalize="false"
              autoCorrect="false"
              spellCheck="false"
            />
            <Button
              block
              type="alternative"
              form="signIn-form"
              htmlType="submit"
              size="large"
              disabled={isLoading}
              loading={isLoading}
            >
              Continue with OTP
            </Button>
          </div>
        )
      }}
    </Form>
  )
}
