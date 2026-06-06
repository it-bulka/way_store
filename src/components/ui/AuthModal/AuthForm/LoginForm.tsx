import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cls from './AuthForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import EyeIcon from '@/assets/general/eye.svg'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { signIn } from '@/redux/async/signIn'
import { fetchUser } from '@/redux/async/fetchUser'
import { loginSchema, type ILoginValues } from './schema'

export interface LoginFormProps {
  onSuccess: () => void
  onForgotPassword: () => void
  loading: boolean
  error: string | null
}

export const LoginForm: FC<LoginFormProps> = ({ onSuccess, onForgotPassword, loading, error }) => {
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
