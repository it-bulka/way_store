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
  { id: 'male', label: 'M' },
  { id: 'female', label: 'Ж' },
  { id: 'other', label: 'Другое' },
]

const InfoForm: FC<InfoFormProps> = ({ name, email, phone, birthday, sex, register, errors }) => {
  const [chosenSexType, setChosenSexType] = useState(sex || 'other')
  const [chosenMonth, setChosenMonth] = useState<number>(0)

  const daysOptions = useMemo(() => {
    return daysInMonth(currentYear, chosenMonth)
  }, [chosenMonth])

  return (
    <div className={cls.block}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        ОБО МНЕ
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
        name={'email'}
        defaultValue={email}
        className={cls.col_1}
        value={email}
        register={register}
        error={errors?.email?.message}
      />
      <Input
        name={'name'}
        defaultValue={name}
        className={cls.col_1}
        register={register}
        error={errors?.name?.message}
      />
      <Input
        name={'phone'}
        defaultValue={phone}
        className={cls.col_1}
        register={register}
        error={errors?.phone?.message}
      />
      <div className={classnames(cls.col_6, cls.flex)}>
        <Input
          name={'birth'}
          defaultValue={'ДЕНЬ РОЖДЕНИЯ'}
          className={classnames(cls.col_1, cls.birthday)}
        />

        <Select
          initialValue={birthday.day || 'ДЕНЬ'}
          className={cls.col_3}
          register={register}
          name={'day'}
          options={daysOptions}
        />
        <Select
          initialValue={birthday.month || 'МЕСЯЦ'}
          className={cls.col_3}
          register={register}
          name={'month'}
          options={months}
          onChose={item => setChosenMonth(item.value as number)}
        />
        <Select
          initialValue={birthday.year >= 0 ? birthday.year : 'ГОД'}
          className={cls.col_3}
          register={register}
          name={'year'}
          options={years}
        />
      </div>

      <fieldset className={cls.passwords}>
        <Typography
          variant="h3"
          type={TypographyTypes.HEADER}
          className={classnames(cls.col_1, cls.legend)}
        >
          МОЙ ПАРОЛЬ
        </Typography>
        <Input
          name="password"
          addendum={<EyeIcon />}
          defaultValue={'НОВЫЙ ПАРОЛЬ'}
          className={cls.col_1}
          register={register}
          error={errors?.password?.message}
        />
        <Input
          name="confirm"
          addendum={<EyeIcon />}
          defaultValue={'СТАРЫЙ ПАРОЛЬ'}
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
        АДРЕС ДОСТАВКИ
      </Typography>
      <Input
        name={'city'}
        label={'ГОРОД'}
        defaultValue={address.city}
        className={cls.col_1}
        error={errors?.city?.message}
      />
      <Input name={'street'} label={'УЛИЦА'} defaultValue={address.street} className={cls.col_7} />
      <Input
        name={'home'}
        label={'ДОМ'}
        defaultValue={address?.home?.toString()}
        className={cls.col_2}
        register={register}
        error={errors?.home?.message}
      />
      <Input
        name={'entrance'}
        label={'ПОДЪЕЗД'}
        defaultValue={address?.entrance?.toString()}
        className={cls.col_2}
        register={register}
      />
      <Input
        name={'floor'}
        label={'ЭТАЖ'}
        defaultValue={address?.floor?.toString()}
        className={classnames(cls.col_2, cls.grow)}
        register={register}
      />
      <Input
        name={'apartment'}
        label={'КВАРТИРА'}
        defaultValue={address.apartment}
        className={cls.col_2}
        register={register}
      />
      <Input
        name={'index'}
        label={'ИНДЕКС'}
        defaultValue={address.index?.toString()}
        className={cls.col_2}
        register={register}
      />
      <TextField
        name="comment"
        label="КОММЕНТАРИИ АДРЕСУ "
        defaultValue={comment}
        className={classnames(cls.col_1, cls.textfield)}
        register={register}
      />
      <Button title={'Подтвердить'} type="submit" className={cls.btn} />
    </div>
  )
}

export const Form: FC<FormProps> = ({ className, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<IFormValues>({
    resolver: yupResolver(formSchema),
  })
  const submitHandler: SubmitHandler<IFormValues> = data => {
    console.log('data', data)
  }

  console.log('errors', errors)
  console.log('touchedFields', touchedFields)

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
      <AddressForm
        address={user.address}
        comment={user.comment}
        register={register}
        errors={errors}
      />
    </form>
  )
}
