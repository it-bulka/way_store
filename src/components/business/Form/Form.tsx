import { type FC, useMemo, useState } from 'react'
import cls from './Form.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/Textfield/TextField'
import { Select } from '@/components/ui/Select/Select'
import EyeIcon from '@/assets/general/eye.svg'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import classnames from 'classnames'
import { IUser, type Sex } from '@/redux/types/user.ts'
import { useForm, type UseFormRegister, type SubmitHandler, FieldErrors } from 'react-hook-form'
import { IFormValues } from '@/components/business/Form/schema.ts'
import { months, years, daysInMonth, currentYear } from '@/utils/data.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from '@/components/business/Form/schema.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { updateUser } from '@/redux/async/updateUser'
import { getAuthUid } from '@/redux/selectors/getAuthSelector'
import { useToast } from '@/context/ToastContext'

interface FormProps {
  className?: string
  user: IUser
}

interface HookFormsParams {
  register?: UseFormRegister<IFormValues>
  errors: FieldErrors<IFormValues>
}

type InfoFormProps = Pick<IUser, 'name' | 'sex' | 'email' | 'birthday' | 'phone'> & HookFormsParams
type AddressFormProps = Pick<IUser, 'comment' | 'address'> & HookFormsParams

const sexTypes: { id: Sex; label: string }[] = [
  { id: 'male', label: 'Ч' },
  { id: 'female', label: 'Ж' },
  { id: 'other', label: 'Інше' },
]

const InfoForm: FC<InfoFormProps> = ({ name, email, phone, birthday, sex, register, errors }) => {
  const [chosenSexType, setChosenSexType] = useState(sex || 'other')
  const [chosenMonth, setChosenMonth] = useState<number>(0)

  const daysOptions = useMemo(() => daysInMonth(currentYear, chosenMonth), [chosenMonth])

  return (
    <div className={cls.block}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        ПРО МЕНЕ
      </Typography>
      <fieldset className={classnames(cls.col_1, cls.radioBtns)}>
        {sexTypes.map(item => (
          <RadioBtn<IFormValues>
            label={item.label}
            value={item.id}
            className={cls.radioBtn}
            onChecked={() => setChosenSexType(item.id)}
            checked={item.id === chosenSexType}
            key={item.id}
            register={register}
            name="sex"
          />
        ))}
      </fieldset>

      <Input
        name="email"
        defaultValue={email}
        className={cls.col_1}
        value={email}
        register={register}
        error={errors?.email?.message}
      />
      <Input
        name="name"
        defaultValue={name}
        className={cls.col_1}
        register={register}
        error={errors?.name?.message}
      />
      <Input
        name="phone"
        defaultValue={phone}
        className={cls.col_1}
        register={register}
        error={errors?.phone?.message}
      />
      <div className={classnames(cls.col_6, cls.flex)}>
        <Input
          name="birth"
          defaultValue="ДЕНЬ НАРОДЖЕННЯ"
          className={classnames(cls.col_1, cls.birthday)}
        />
        <Select
          initialValue={birthday.day || 'ДЕНЬ'}
          className={cls.col_3}
          register={register}
          name="day"
          options={daysOptions}
        />
        <Select
          initialValue={birthday.month || 'МІСЯЦЬ'}
          className={cls.col_3}
          register={register}
          name="month"
          options={months}
          onChose={item => setChosenMonth(item.value as number)}
        />
        <Select
          initialValue={birthday.year >= 0 ? birthday.year : 'РІК'}
          className={cls.col_3}
          register={register}
          name="year"
          options={years}
        />
      </div>

      <fieldset className={cls.passwords}>
        <Typography
          variant="h3"
          type={TypographyTypes.HEADER}
          className={classnames(cls.col_1, cls.legend)}
        >
          МІЙ ПАРОЛЬ
        </Typography>
        <Input
          name="password"
          addendum={<EyeIcon />}
          defaultValue="НОВИЙ ПАРОЛЬ"
          className={cls.col_1}
          register={register}
          error={errors?.password?.message}
        />
        <Input
          name="confirm"
          addendum={<EyeIcon />}
          defaultValue="СТАРИЙ ПАРОЛЬ"
          className={cls.col_1}
          register={register}
          error={errors?.confirm?.message}
        />
      </fieldset>
    </div>
  )
}

const AddressForm: FC<AddressFormProps> = ({ address, comment, register, errors }) => {
  return (
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
}

export const Form: FC<FormProps> = ({ className, user }) => {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(getAuthUid)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(formSchema) })

  const submitHandler: SubmitHandler<IFormValues> = async data => {
    if (!uid) return
    const userUpdate: Partial<IUser> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      sex: data.sex as Sex,
      birthday: {
        day: Number(data.day),
        month: Number(data.month),
        year: Number(data.year),
      },
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
    }
    const result = await dispatch(updateUser({ userId: uid, data: userUpdate }))
    if (updateUser.fulfilled.match(result)) {
      addToast('Дані збережено', 'success')
    } else {
      addToast('Помилка збереження даних', 'error')
    }
  }

  return (
    <form
      noValidate
      className={classnames(cls.form, [className])}
      onSubmit={handleSubmit(submitHandler)}
    >
      <InfoForm
        name={user.name}
        email={user.email}
        sex={user.sex}
        phone={user.phone}
        birthday={user.birthday}
        register={register}
        errors={errors}
      />
      <AddressForm address={user.address} comment={user.comment} register={register} errors={errors} />
    </form>
  )
}
