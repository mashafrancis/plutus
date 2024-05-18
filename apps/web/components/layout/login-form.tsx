import { authenticate } from '@/app/actions'
import { signIn } from '@/auth'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui-elements/button'
import { Form } from '@/components/ui-elements/form'
import Input from '@/components/ui-elements/input'
import { authSchema } from '@/lib/validations/auth'
import { toFormikValidationSchema } from '@/lib/zod-formik-adapter'
import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { z } from 'zod'

type FormData = z.infer<typeof authSchema>

export default function LoginForm() {
  const [_, socialLogin] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()
  const searchParams = useSearchParams()
  const search = searchParams.get('success')
    ? { data: JSON.parse(searchParams.get('success')!), success: true }
    : { success: false }
  const redirectTo = search.success ? search.data.redirectTo : '/overview'

  const handleLogin = async ({ email }: FormData) => {
    // const res = await fetch(apiUrls.auth.login, {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    await signIn('resend', {
      email,
      callbackUrl: redirectTo,
    })

    // if (!res.ok) {
    //   const error = await res.json()
    //   throw new Error(error.message)
    // }
    //
    // return await res.json()
  }

  return (
    <Fragment>
      <Form
        validateOnBlur
        id="signIn-form"
        initialValues={{ email: '' }}
        validationSchema={toFormikValidationSchema(authSchema)}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => {
          return (
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="panic@thedis.co"
                disabled={isSubmitting}
              />
              <Button
                block
                form="signIn-form"
                htmlType="submit"
                size="medium"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Sign in with email
              </Button>
            </div>
          )
        }}
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center uppercase py-2">
          <span className="px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <form action={socialLogin} className="flex flex-col items-center">
        <Button
          type="outline"
          className="w-full"
          size="medium"
          htmlType="submit"
          disabled={pending}
          icon={<Icons.google className="mr-2 h-4 w-4" />}
        >
          Google
        </Button>
      </form>
    </Fragment>
  )
}
