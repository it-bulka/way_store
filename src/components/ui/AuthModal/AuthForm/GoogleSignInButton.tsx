import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './AuthForm.module.scss'
import GoogleIcon from '@/assets/general/google.svg'

interface GoogleSignInButtonProps {
  onClick: () => void
  disabled: boolean
}

export const GoogleSignInButton = memo<GoogleSignInButtonProps>(({ onClick, disabled }) => {
  const { t } = useTranslation('auth')

  return (
    <button type="button" className={cls.googleBtn} onClick={onClick} disabled={disabled}>
      <GoogleIcon />
      {t('googleSignIn')}
    </button>
  )
})
