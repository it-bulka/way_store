import { memo } from 'react'
import cls from './AuthForm.module.scss'
import GoogleIcon from '@/assets/general/google.svg'

interface GoogleSignInButtonProps {
  onClick: () => void
  disabled: boolean
}

export const GoogleSignInButton = memo<GoogleSignInButtonProps>(({ onClick, disabled }) => (
  <button type="button" className={cls.googleBtn} onClick={onClick} disabled={disabled}>
    <GoogleIcon />
    Увійти через Google
  </button>
))
