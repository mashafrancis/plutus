'use client'

import { createPushModal } from '@/lib/push-modal/factory'
import LoginDetails from '@/modals/login-details'
import Confirm, { type ConfirmProps } from './confirm'

// const _Loading = () => (
//   <ModalContent className="flex items-center justify-center">
//     <GenericSkeletonLoader />
//   </ModalContent>
// )

const modals = {
  loginDetails: LoginDetails,
  confirm: Confirm,
}

export const {
  pushModal,
  popModal,
  popAllModals,
  ModalProvider,
  useOnPushModal,
} = createPushModal({
  modals,
})

export const showConfirm = (props: ConfirmProps) => pushModal('confirm', props)
