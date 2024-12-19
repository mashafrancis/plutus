import { GoogleSignIn } from '@/components/google-signin'
import { OTPSignIn } from '@/components/otp-signin'
import useMediaQuery from '@/hooks/use-media-query'
import { ModalContent, ModalHeader } from '@/modals/common/container'

const LoginDetails = () => {
  const { isMobile } = useMediaQuery()

  return (
    <ModalContent onClose={isMobile}>
      <ModalHeader
        className="items-start justify-start text-left"
        title="Sign In"
        text="Sign in to access your account and continue."
      />
      <div className="flex flex-col space-y-4 px-4 py-8 md:px-8">
        <OTPSignIn />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center uppercase py-2">
            <span className="px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <GoogleSignIn />
      </div>
    </ModalContent>
  )
}

export default LoginDetails
