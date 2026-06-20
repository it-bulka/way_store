import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import cls from './AuthForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import EyeIcon from '@/assets/general/eye.svg'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { signUp } from '@/redux/async/signUp'
import { registerSchema, type IRegisterValues } from './schema'

export interface RegisterFormProps {
  onSuccess: () => void
  loading: boolean
  error: string | null
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSuccess, loading, error }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('auth')
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
      <ModalTitle>{t('register.title')}</ModalTitle>
      <Input
        name="name"
        label={t('register.fullName')}
        register={register}
        error={errors.name?.message}
      />
      <Input
        name="email"
        label={t('register.email')}
        register={register}
        error={errors.email?.message}
      />
      <Input
        name="phone"
        label={t('register.phone')}
        register={register}
        error={errors.phone?.message}
      />
      <Input
        name="password"
        label={t('register.password')}
        type="password"
        addendum={<EyeIcon />}
        register={register}
        error={errors.password?.message}
      />
      {error && <Typography className={cls.error}>{error}</Typography>}
      <Button title={t('register.submit')} type="submit" disabled={loading} className={cls.btn} />
    </form>
  )
}
