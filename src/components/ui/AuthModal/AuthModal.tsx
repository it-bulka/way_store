import { type FC } from 'react'
import { Modal, ModalProps } from '@/components/ui/Modal/Modal'
//import { AuthForm } from './AuthForm/AuthForm'
//import { PasswordRecovery } from './PasswordRecovery/PasswordRecovery'
import { ChangePassword } from './ChangePasswordForm/ChangePassword'

type AuthModalProps = Omit<ModalProps, 'children'>

export const AuthModal: FC<AuthModalProps> = props => {
  return (
    <Modal {...props}>
      <ChangePassword />
    </Modal>
  )
}
