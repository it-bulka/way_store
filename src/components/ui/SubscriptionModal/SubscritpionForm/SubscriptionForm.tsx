import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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

const schema = yup.object({
  email: yup.string().email('Невірний email').required("Email обов'язковий"),
  name: yup.string().required("Ім'я обов'язкове"),
})

export const SubscriptionForm = () => {
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
      addToast('Ви успішно підписались на розсилку', 'success')
      reset()
    } catch {
      addToast('Помилка підписки. Спробуйте ще раз', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cls.subscribtionForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography type={TypographyTypes.HEADER} variant="h3" className={cls.title}>
        Підписуйтесь, щоб отримувати новини про колекції, колаборації та спеціальні пропозиції.
      </Typography>
      <div className={cls.fields}>
        <Input name="email" label="E-MAIL" register={register} error={errors.email?.message} />
        <Input name="name" label="ІМ'Я" register={register} error={errors.name?.message} />
      </div>
      <Button title="ПІДПИСАТИСЯ" type="submit" disabled={loading} />
    </form>
  )
}
