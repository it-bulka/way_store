import { type FC, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import cls from './PasswordRecovery.module.scss'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/base/firebase'

const schema = yup.object({ email: yup.string().email('Невірний email').required() })

interface PasswordRecoveryProps {
  onBack: () => void
}

export const PasswordRecovery: FC<PasswordRecoveryProps> = ({ onBack }) => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setSubmitted(true)
      setServerError(null)
    } catch (e) {
      setServerError((e as Error).message)
    }
  }

  return (
    <div className={cls.recovery}>
      <ModalTitle>ВІДНОВЛЕННЯ ПАРОЛЯ</ModalTitle>
      {isSubmitted ? (
        <Typography className={cls.info}>
          ЯКЩО АКАУНТ «{getValues('email')}» ІСНУЄ, ВАМ БУДЕ НАДІСЛАНО ЕЛЕКТРОННИЙ ЛИСТ З ПОДАЛЬШИМИ
          ІНСТРУКЦІЯМИ
        </Typography>
      ) : (
        <>
          <Typography className={cls.info}>
            ВВЕДІТЬ E-MAIL, ВКАЗАНИЙ ПРИ РЕЄСТРАЦІЇ, І ДОТРИМУЙТЕСЬ ПОДАЛЬШИХ ІНСТРУКЦІЙ
          </Typography>
          <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input name="email" label="E-MAIL" register={register} error={errors.email?.message} />
            {serverError && <Typography className={cls.error}>{serverError}</Typography>}
            <Button
              title="СКИНУТИ ПАРОЛЬ"
              type="submit"
              disabled={isSubmitting}
              className={cls.btn}
            />
          </form>
        </>
      )}
      <button type="button" className={cls.backBtn} onClick={onBack}>
        ← Назад до входу
      </button>
    </div>
  )
}
