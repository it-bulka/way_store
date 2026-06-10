import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './AuthForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getAuthLoading, getAuthError } from '@/redux/selectors/getAuthSelector'
import { signInWithGoogle } from '@/redux/async/signInWithGoogle'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { GoogleSignInButton } from './GoogleSignInButton'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
  onSuccess: () => void
  onForgotPassword: () => void
}

export const AuthForm: FC<AuthFormProps> = ({ onSuccess, onForgotPassword }) => {
  const [mode, setMode] = useState<AuthMode>('login')
  const dispatch = useAppDispatch()
  const loading = useAppSelector(getAuthLoading)
  const error = useAppSelector(getAuthError)
  const { t } = useTranslation('auth')

  const handleGoogleSignIn = async () => {
    const result = await dispatch(signInWithGoogle())
    if (signInWithGoogle.fulfilled.match(result)) {
      onSuccess()
    }
  }

  return (
    <div className={cls.authForm}>
      <div className={cls.tabs}>
        <button
          type="button"
          className={mode === 'login' ? cls.activeTab : cls.tab}
          onClick={() => setMode('login')}
        >
          {t('tabs.login')}
        </button>
        <button
          type="button"
          className={mode === 'register' ? cls.activeTab : cls.tab}
          onClick={() => setMode('register')}
        >
          {t('tabs.register')}
        </button>
      </div>
      {mode === 'login' ? (
        <LoginForm
          onSuccess={onSuccess}
          onForgotPassword={onForgotPassword}
          loading={loading}
          error={error}
        />
      ) : (
        <RegisterForm onSuccess={onSuccess} loading={loading} error={error} />
      )}
      <div className={cls.divider}>
        <span>{t('or')}</span>
      </div>
      <GoogleSignInButton onClick={handleGoogleSignIn} disabled={loading} />
    </div>
  )
}
