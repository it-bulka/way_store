import { type FC } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/Textfield/TextField'
import { type IUser } from '@/redux/types/user.ts'
import { type SubmitHandler } from 'react-hook-form'
import { type IAddressFormValues, addressSchema } from './schema'
import { useProfileForm } from '@/hooks/useProfileForm'

type AddressFormProps = Pick<IUser, 'comment' | 'address'>

export const AddressForm: FC<AddressFormProps> = ({ address, comment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    saveUser,
  } = useProfileForm<IAddressFormValues>(addressSchema)

  const submitHandler: SubmitHandler<IAddressFormValues> = async data => {
    await saveUser({
      address: {
        city: data.city,
        street: data.street ?? '',
        home: Number(data.home),
        apartment: data.apartment ?? '',
        entrance: data.entrance ?? '',
        index: Number(data.index),
        floor: Number(data.floor),
      },
      comment: data.comment ?? '',
    })
  }

  return (
    <form noValidate className={cls.block} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        АДРЕСА ДОСТАВКИ
      </Typography>
      <Input
        name="city"
        label="МІСТО"
        defaultValue={address.city}
        className={cls.col_1}
        register={register}
        error={errors?.city?.message}
      />
      <Input
        name="street"
        label="ВУЛИЦЯ"
        defaultValue={address.street}
        className={cls.col_7}
        register={register}
      />
      <Input
        name="home"
        label="БУДИНОК"
        defaultValue={address?.home?.toString()}
        className={cls.col_2}
        register={register}
        error={errors?.home?.message}
      />
      <Input
        name="entrance"
        label="ПІД'ЇЗД"
        defaultValue={address?.entrance?.toString()}
        className={cls.col_2}
        register={register}
      />
      <Input
        name="floor"
        label="ПОВЕРХ"
        defaultValue={address?.floor?.toString()}
        className={classnames(cls.col_2, cls.grow)}
        register={register}
      />
      <Input
        name="apartment"
        label="КВАРТИРА"
        defaultValue={address.apartment}
        className={cls.col_2}
        register={register}
      />
      <Input
        name="index"
        label="ІНДЕКС"
        defaultValue={address.index?.toString()}
        className={cls.col_2}
        register={register}
      />
      <TextField
        name="comment"
        label="КОМЕНТАР ДО АДРЕСИ"
        defaultValue={comment}
        className={classnames(cls.col_1, cls.textfield)}
        register={register}
      />
      <Button title="Підтвердити" type="submit" className={cls.btn} />
    </form>
  )
}
