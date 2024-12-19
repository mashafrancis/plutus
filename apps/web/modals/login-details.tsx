import { GoogleSignIn } from '@/components/google-signin'
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
        <GoogleSignIn />
      </div>
    </ModalContent>
  )
}

export default LoginDetails
