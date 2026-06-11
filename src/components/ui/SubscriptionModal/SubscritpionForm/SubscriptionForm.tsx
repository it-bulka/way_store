import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'
import cls from './SubscriptionForm.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { saveSubscriber } from '@/services'
import { useToast } from '@/context/ToastContext'

interface ISubscriptionForm {
  email: string
  name: string
}

const tAuth = i18n.t.bind(i18n) as (key: string, opts: object) => string
const tv = (key: string) => () => tAuth(`validation.${key}`, { ns: 'auth' })

const schema = yup.object({
  email: yup.string().email(tv('emailInvalid')).required(tv('emailRequired')),
  name: yup.string().required(tv('nameRequired')),
})

export const SubscriptionForm = () => {
  const { t } = useTranslation('common')
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISubscriptionForm>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<ISubscriptionForm> = async ({ email, name }) => {
    setLoading(true)
    try {
      await saveSubscriber(email, name)
      addToast(t('subscription.success'), 'success')
      reset()
    } catch {
      addToast(t('subscription.error'), 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cls.subscribtionForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography type={TypographyTypes.HEADER} variant="h3" className={cls.title}>
        {t('subscription.title')}
      </Typography>
      <div className={cls.fields}>
        <Input name="email" label={t('subscription.email')} register={register} error={errors.email?.message} />
        <Input name="name" label={t('subscription.name')} register={register} error={errors.name?.message} />
      </div>
      <Button title={t('subscription.submit')} type="submit" disabled={loading} />
    </form>
  )
}
