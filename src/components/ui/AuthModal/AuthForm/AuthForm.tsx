import { type FC, useState } from 'react'
import cls from './AuthForm.module.scss'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getAuthLoading, getAuthError } from '@/redux/selectors/getAuthSelector'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
  onSuccess: () => void
  onForgotPassword: () => void
}

export const AuthForm: FC<AuthFormProps> = ({ onSuccess, onForgotPassword }) => {
  const [mode, setMode] = useState<AuthMode>('login')
  const loading = useAppSelector(getAuthLoading)
  const error = useAppSelector(getAuthError)

  return (
    <div className={cls.authForm}>
      <div className={cls.tabs}>
        <button
          type="button"
          className={mode === 'login' ? cls.activeTab : cls.tab}
          onClick={() => setMode('login')}
        >
          ВХІД
        </button>
        <button
          type="button"
          className={mode === 'register' ? cls.activeTab : cls.tab}
          onClick={() => setMode('register')}
        >
          РЕЄСТРАЦІЯ
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
    </div>
  )
}
