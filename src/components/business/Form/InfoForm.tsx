import { type FC, useMemo, useState } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Select } from '@/components/ui/Select/Select'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import EyeIcon from '@/assets/general/eye.svg'
import { type IUser, type Sex } from '@/redux/types/user.ts'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type IFormValues } from './schema'
import { months, years, daysInMonth, currentYear } from '@/utils/data.ts'

const sexTypes: { id: Sex; label: string }[] = [
  { id: 'male', label: 'Ч' },
  { id: 'female', label: 'Ж' },
  { id: 'other', label: 'Інше' },
]

export interface InfoFormProps extends Pick<IUser, 'name' | 'sex' | 'email' | 'birthday' | 'phone'> {
  register?: UseFormRegister<IFormValues>
  errors: FieldErrors<IFormValues>
}

export const InfoForm: FC<InfoFormProps> = ({ name, email, phone, birthday, sex, register, errors }) => {
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
