import { GoogleSignIn } from '@/components/google-signin'
import { OTPSignIn } from '@/components/otp-signin'
import { Fragment } from 'react'

export default function LoginForm() {
  return (
    <Fragment>
      <OTPSignIn />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center uppercase py-2">
          <span className="px-2 text-foreground-lighter">Or</span>
        </div>
      </div>

      <GoogleSignIn />
    </Fragment>
  )
}
