import { type FC } from 'react'
import cls from './Form.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import EyeIcon from '@/assets/general/eye.svg'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type IPasswordFormValues, passwordSchema } from './schema'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getUserSelector } from '@/redux/selectors/getUserSelector'
import { useToast } from '@/context/ToastContext'
import { changePassword } from '@/services/changePassword'
import { auth } from '@/base/firebase'

const isGoogleProvider = () =>
  auth.currentUser?.providerData.some(p => p.providerId === 'google.com') ?? false

export const PasswordForm: FC = () => {
  const user = useAppSelector(getUserSelector)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IPasswordFormValues>({ resolver: yupResolver(passwordSchema) })

  const submitHandler: SubmitHandler<IPasswordFormValues> = async data => {
    if (!user) return
    try {
      await changePassword(user.email, data.oldPassword, data.newPassword)
      addToast('Пароль змінено', 'success')
      reset()
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('oldPassword', { message: 'Невірний старий пароль' })
      } else if (code === 'auth/user-not-found') {
        addToast('Користувач не авторизований', 'error')
      } else {
        addToast('Помилка зміни паролю', 'error')
      }
    }
  }

  if (isGoogleProvider()) {
    return (
      <div className={cls.block}>
        <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.col_1}>
          МІЙ ПАРОЛЬ
        </Typography>
        <Typography variant="p" type={TypographyTypes.P} className={cls.col_1}>
          Пароль керується через Google акаунт
        </Typography>
      </div>
    )
  }

  return (
    <form noValidate className={cls.block} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.col_1}>
        МІЙ ПАРОЛЬ
      </Typography>
      <Input
        name="newPassword"
        type="password"
        label="Новий пароль"
        addendum={<EyeIcon />}
        className={cls.col_1}
        register={register}
        error={errors?.newPassword?.message}
      />
      <Input
        name="confirmPassword"
        type="password"
        label="Підтвердіть пароль"
        addendum={<EyeIcon />}
        className={cls.col_1}
        register={register}
        error={errors?.confirmPassword?.message}
      />
      <Input
        name="oldPassword"
        type="password"
        label="Старий пароль"
        addendum={<EyeIcon />}
        className={cls.col_1}
        register={register}
        error={errors?.oldPassword?.message}
      />
      <Button title="Підтвердити" type="submit" className={cls.btn} />
    </form>
  )
}
