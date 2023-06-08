import { type FC } from 'react'
import cls from './ContactForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { TextField } from '@/components/ui/Textfield/TextField'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { Button } from '@/components/ui/Button/Button'

interface ContactFormProps {
  className?: string
}
export const ContactForm: FC<ContactFormProps> = ({ className = '' }) => {
  return (
    <form className={cls.contactForm + ' ' + className}>
      <div className={cls.inputs}>
        <Input label="ПОЛНОЕ ИМЯ" name="name" />
        <Input label="АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ" name="email" />
        <Input label="НОМЕР ТЕЛЕФОНА" name="tel" />
        <Input label="ТЕМА" name="theme" />
      </div>

      <TextField name="comment" label="ОСТАВЬТЕ ВАШЕ СООБЩЕНИЕ" />
      <div>
        <Checkbox label="Я ХОЧУ ПОДПИСАТЬСЯ НА РАССЫЛКУ" checked={true} className={cls.checkbox} />
      </div>
      <Button title="ПОДТВЕРДИТЬ" />
    </form>
  )
}
