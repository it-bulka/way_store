import { type FC, useState } from 'react'
import { Modal, type ModalProps } from '@/components/ui/Modal/Modal'
import { AuthForm } from './AuthForm/AuthForm'
import { PasswordRecovery } from './PasswordRecovery/PasswordRecovery'

type AuthModalProps = Omit<ModalProps, 'children'>

type AuthView = 'auth' | 'recovery'

export const AuthModal: FC<AuthModalProps> = ({ close, ...props }) => {
  const [view, setView] = useState<AuthView>('auth')

  const handleClose = () => {
    setView('auth')
    close()
  }

  return (
    <Modal {...props} close={handleClose}>
      {view === 'auth' ? (
        <AuthForm onSuccess={handleClose} onForgotPassword={() => setView('recovery')} />
      ) : (
        <PasswordRecovery onBack={() => setView('auth')} />
      )}
    </Modal>
  )
}
