import { type FC, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import cls from './PasswordRecovery.module.scss'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/base/firebase'
import i18n from '@/i18n/config'

const getSchema = () =>
  yup.object({
    email: yup
      .string()
      .email(() => i18n.t('validation.emailInvalid', { ns: 'auth' }))
      .required(() => i18n.t('validation.emailRequired', { ns: 'auth' })),
  })

interface PasswordRecoveryProps {
  onBack: () => void
}

export const PasswordRecovery: FC<PasswordRecoveryProps> = ({ onBack }) => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { t } = useTranslation('auth')

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({ resolver: yupResolver(getSchema()) })

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
      <ModalTitle>{t('passwordRecovery.title')}</ModalTitle>
      {isSubmitted ? (
        <Typography className={cls.info}>
          {t('passwordRecovery.infoSent', { email: getValues('email') })}
        </Typography>
      ) : (
        <>
          <Typography className={cls.info}>{t('passwordRecovery.infoPrompt')}</Typography>
          <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              name="email"
              label={t('login.email')}
              register={register}
              error={errors.email?.message}
            />
            {serverError && <Typography className={cls.error}>{serverError}</Typography>}
            <Button
              title={t('passwordRecovery.submit')}
              type="submit"
              disabled={isSubmitting}
              className={cls.btn}
            />
          </form>
        </>
      )}
      <button type="button" className={cls.backBtn} onClick={onBack}>
        {t('passwordRecovery.backToLogin')}
      </button>
    </div>
  )
}
