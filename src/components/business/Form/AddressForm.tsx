import { type FC } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/Textfield/TextField'
import { type IUser } from '@/redux/types/user.ts'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type IFormValues } from './schema'

export interface AddressFormProps extends Pick<IUser, 'comment' | 'address'> {
  register?: UseFormRegister<IFormValues>
  errors: FieldErrors<IFormValues>
}

export const AddressForm: FC<AddressFormProps> = ({ address, comment, register, errors }) => (
  <div className={cls.block}>
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
  </div>
)
