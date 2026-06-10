import { type FC } from 'react'
import cls from './DeliveryForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type ICheckoutFormValues } from '../schema'

interface DeliveryFormProps {
  register: UseFormRegister<ICheckoutFormValues>
  errors: FieldErrors<ICheckoutFormValues>
}

export const DeliveryForm: FC<DeliveryFormProps> = ({ register, errors }) => (
  <div className={cls.root}>
    <Input<ICheckoutFormValues>
      name="city"
      label="МІСТО"
      register={register}
      error={errors.city?.message}
    />
    <Input<ICheckoutFormValues> name="street" label="ВУЛИЦЯ" register={register} />
    <div className={cls.row}>
      <Input<ICheckoutFormValues>
        name="home"
        label="БУДИНОК"
        register={register}
        error={errors.home?.message}
      />
      <Input<ICheckoutFormValues> name="apartment" label="КВАРТИРА" register={register} />
    </div>
  </div>
)
