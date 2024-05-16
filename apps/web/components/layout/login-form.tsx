import { authenticate } from '@/app/actions'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui-elements/button'
import { Form } from '@/components/ui-elements/form'
import Input from '@/components/ui-elements/input'
import { apiUrls } from '@/lib/apiUrls'
import { authSchema } from '@/lib/validations/auth'
import { toFormikValidationSchema } from '@/lib/zod-formik-adapter'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { z } from 'zod'

type FormData = z.infer<typeof authSchema>

export default function LoginForm() {
  const [_, socialLogin] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()
  const _searchParams = useSearchParams()

  const handleLogin = async ({ email }: FormData) => {
    const res = await fetch(apiUrls.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message)
    }

    return await res.json()
  }

  return (
    <>
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
                label="Email"
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
                Send magic link
              </Button>
            </div>
          )
        }}
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form action={socialLogin} className="flex flex-col items-center">
        <Button
          type="outline"
          className="w-full"
          size="large"
          htmlType="submit"
          disabled={pending}
          icon={<Icons.google className="mr-2 h-4 w-4" />}
        >
          Sign in with google
        </Button>
      </form>
    </>
  )
}
