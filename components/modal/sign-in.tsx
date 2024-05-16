import LoginForm from '@/components/layout/login-form'
import { Modal } from '@/components/shared/modal'
import { siteConfig } from '@/config/site'
import { useSignInModal } from '@/store/use-sign-in-modal'
import { Icons } from '../icons'

export const SignInModal = () => {
  const signInModal = useSignInModal()

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="h-10 w-10" />
          </a>
          <h3 className="text-2xl font-bold">Sign In</h3>
          <p className="text-gray-500">
            Sign in to access your account and continue using Plutus.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-8">
          <LoginForm />
        </div>
      </div>
    </Modal>
  )
}
