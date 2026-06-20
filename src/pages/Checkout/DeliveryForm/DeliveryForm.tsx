import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './DeliveryForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type ICheckoutFormValues } from '../schema'

interface DeliveryFormProps {
  register: UseFormRegister<ICheckoutFormValues>
  errors: FieldErrors<ICheckoutFormValues>
}

export const DeliveryForm: FC<DeliveryFormProps> = ({ register, errors }) => {
  const { t } = useTranslation('checkout')
  return (
    <div className={cls.root}>
      <Input<ICheckoutFormValues>
        name="city"
        label={t('address.city')}
        register={register}
        error={errors.city?.message}
      />
      <Input<ICheckoutFormValues> name="street" label={t('address.street')} register={register} />
      <div className={cls.row}>
        <Input<ICheckoutFormValues>
          name="home"
          label={t('address.home')}
          register={register}
          error={errors.home?.message}
        />
        <Input<ICheckoutFormValues>
          name="apartment"
          label={t('address.apartment')}
          register={register}
        />
      </div>
    </div>
  )
}
