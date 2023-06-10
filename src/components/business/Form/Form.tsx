import { type FC, FormEvent, useState } from 'react'
import cls from './Form.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/Textfield/TextField'
import { Select } from '@/components/ui/Select/Select'
import EyeIcon from '@/assets/general/eye.svg'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import classnames from 'classnames'

interface FormProps {
  className?: string
}

const sexTypes = ['M', 'Ж', 'Другое']

const InfoForm = () => {
  const [chosenSexType, setChosenSexType] = useState(sexTypes[0])
  return (
    <div className={cls.block}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        ОБО МНЕ
      </Typography>
      <fieldset className={classnames(cls.col_1, cls.radioBtns)}>
        {sexTypes.map(item => (
          <RadioBtn
            label={item}
            value={item}
            className={cls.radioBtn}
            onChecked={() => setChosenSexType(item)}
            checked={item === chosenSexType}
            key={item}
          />
        ))}
      </fieldset>

      <Input name={'email'} defaultValue={'aLVOST97@GMAIL.COM'} className={cls.col_1} />
      <Input name={'name'} defaultValue={'ВОСТРИКОВ СЕМЕН ЕБАНЬКОВОВИЧ'} className={cls.col_1} />
      <Input name={'phone'} defaultValue={'+7 999 555-33-36'} className={cls.col_1} />
      <div className={classnames(cls.col_6, cls.flex)}>
        <Input
          name={'birth'}
          defaultValue={'ДЕНЬ РОЖДЕНИЯ'}
          className={classnames(cls.col_1, cls.birthday)}
        />

        <Select initialValue={'ДЕНЬ'} className={cls.col_3} />
        <Select initialValue={'МЕСЯЦ'} className={cls.col_3} />
        <Select initialValue={'ГОД'} className={cls.col_3} />
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
        />
        <Input
          name="confirm"
          addendum={<EyeIcon />}
          defaultValue={'СТАРЫЙ ПАРОЛЬ'}
          className={cls.col_1}
        />
      </fieldset>
    </div>
  )
}

const AddressForm = () => {
  return (
    <div className={cls.block}>
      <Typography variant="h3" type={TypographyTypes.HEADER}>
        АДРЕС ДОСТАВКИ
      </Typography>
      <Input name={'email'} label={'ГОРОД'} className={cls.col_1} />
      <Input name={'street'} label={'УЛИЦА'} className={cls.col_7} />
      <Input name={'home'} label={'ДОМ'} className={cls.col_2} />
      <Input name={'name'} label={'ПОДЪЕЗД'} className={cls.col_2} />
      <Input name={'floor'} label={'ЭТАЖ'} className={classnames(cls.col_2, cls.grow)} />
      <Input name={'appartment'} label={'КВАРТИРА'} className={cls.col_2} />
      <Input name={'index'} label={'ИНДЕКС'} className={cls.col_2} />
      <TextField
        name="comment"
        label="КОММЕНТАРИИ АДРЕСУ "
        className={classnames(cls.col_1, cls.textfield)}
      />
      <Button title={'Подтвердить'} type="submit" className={cls.btn} />
    </div>
  )
}

export const Form: FC<FormProps> = ({ className }) => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form className={classnames(cls.form, [className])} onSubmit={submitHandler}>
      <InfoForm />
      <AddressForm />
    </form>
  )
}
