import { type FC, useMemo, useState } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Select } from '@/components/ui/Select/Select'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import { Button } from '@/components/ui/Button/Button'
import { type IUser, type Sex } from '@/redux/types/user.ts'
import { type SubmitHandler } from 'react-hook-form'
import { type IInfoFormValues, infoSchema } from './schema'
import { useProfileForm } from '@/hooks/useProfileForm'
import { months, years, daysInMonth, currentYear } from '@/utils/data.ts'

const sexTypes: { id: Sex; label: string }[] = [
  { id: 'male', label: 'Ч' },
  { id: 'female', label: 'Ж' },
  { id: 'other', label: 'Інше' },
]

type InfoFormProps = Pick<IUser, 'name' | 'sex' | 'email' | 'birthday' | 'phone'>

export const InfoForm: FC<InfoFormProps> = ({ name, email, phone, birthday, sex }) => {
  const { register, handleSubmit, formState: { errors }, saveUser } = useProfileForm<IInfoFormValues>(infoSchema)

  const [chosenSexType, setChosenSexType] = useState(sex || 'other')
  const [chosenMonth, setChosenMonth] = useState<number>(0)

  const daysOptions = useMemo(() => daysInMonth(currentYear, chosenMonth), [chosenMonth])

  const submitHandler: SubmitHandler<IInfoFormValues> = async data => {
    await saveUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      sex: data.sex as Sex,
      birthday: {
        day: Number(data.day),
        month: Number(data.month),
        year: Number(data.year),
      },
    })
  }

  return (
    <form noValidate className={cls.block} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        ПРО МЕНЕ
      </Typography>
      <fieldset className={classnames(cls.col_1, cls.radioBtns)}>
        {sexTypes.map(item => (
          <RadioBtn<IInfoFormValues>
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
        <Typography
          variant="h3"
          type={TypographyTypes.HEADER}
          className={classnames(cls.col_1, cls.birthday)}
        >
          ДЕНЬ НАРОДЖЕННЯ
        </Typography>
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

      <Button title="Підтвердити" type="submit" className={cls.btn} />
    </form>
  )
}
