'use client'

import { verifyOtpAction } from '@/actions/verify-otp-action'
import Input from '@/components/ui-elements/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@plutus/supabase/client'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  })

  const onSubmit = async ({ value }: FormData) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="phoneoremail"
                    placeholder="Enter phone-number or email"
                    autoFocus={!isMobile}
                    disabled={isLoading}
                    autoCapitalize="false"
                    autoCorrect="false"
                    spellCheck="false"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            block
            type="primary"
            form="signIn-form"
            htmlType="submit"
            size="large"
            disabled={isLoading}
            loading={isLoading}
            className="active:scale-[0.98]"
          >
            Continue with OTP
          </Button>
        </div>
      </form>
    </Form>
  )
}
