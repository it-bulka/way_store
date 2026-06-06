import { type FC, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cls from './AuthForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import EyeIcon from '@/assets/general/eye.svg'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { signIn } from '@/redux/async/signIn'
import { signUp } from '@/redux/async/signUp'
import { fetchUser } from '@/redux/async/fetchUser'
import { getAuthLoading, getAuthError } from '@/redux/selectors/getAuthSelector'
import {
  loginSchema,
  registerSchema,
  type ILoginValues,
  type IRegisterValues,
} from './schema'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
  onSuccess: () => void
  onForgotPassword: () => void
}

interface LoginFormProps {
  onSuccess: () => void
  onForgotPassword: () => void
  loading: boolean
  error: string | null
}

interface RegisterFormProps {
  onSuccess: () => void
  loading: boolean
  error: string | null
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess, onForgotPassword, loading, error }) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginValues>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<ILoginValues> = async ({ email, password }) => {
    const result = await dispatch(signIn({ email, password }))
    if (signIn.fulfilled.match(result)) {
      await dispatch(fetchUser(result.payload.uid))
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ModalTitle>ВХІД</ModalTitle>
      <Input name="email" label="E-MAIL" register={register} error={errors.email?.message} />
      <Input
        name="password"
        label="ПАРОЛЬ"
        type="password"
        addendum={<EyeIcon />}
        register={register}
        error={errors.password?.message}
      />
      {error && <Typography className={cls.error}>{error}</Typography>}
      <button type="button" className={cls.link} onClick={onForgotPassword}>
        Забули пароль?
      </button>
      <Button title="УВІЙТИ" type="submit" disabled={loading} className={cls.btn} />
      <Checkbox label="Залишатись у системі" checked={false} />
    </form>
  )
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess, loading, error }) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterValues>({ resolver: yupResolver(registerSchema) })

  const onSubmit: SubmitHandler<IRegisterValues> = async ({ email, password, name }) => {
    const result = await dispatch(signUp({ email, password, name }))
    if (signUp.fulfilled.match(result)) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ModalTitle>РЕЄСТРАЦІЯ</ModalTitle>
      <Input name="name" label="ПІБ" register={register} error={errors.name?.message} />
      <Input name="email" label="E-MAIL" register={register} error={errors.email?.message} />
      <Input name="phone" label="ТЕЛЕФОН" register={register} error={errors.phone?.message} />
      <Input
        name="password"
        label="ПАРОЛЬ"
        type="password"
        addendum={<EyeIcon />}
        register={register}
        error={errors.password?.message}
      />
      {error && <Typography className={cls.error}>{error}</Typography>}
      <Button title="ЗАРЕЄСТРУВАТИСЬ" type="submit" disabled={loading} className={cls.btn} />
    </form>
  )
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
