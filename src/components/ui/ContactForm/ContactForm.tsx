import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ContactForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { TextField } from '@/components/ui/Textfield/TextField'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { Button } from '@/components/ui/Button/Button'
import classnames from 'classnames'

interface ContactFormProps {
  className?: string
}

export const ContactForm: FC<ContactFormProps> = ({ className }) => {
  const { t } = useTranslation('faq')

  return (
    <form className={classnames(cls.contactForm, [className])}>
      <div className={cls.inputs}>
        <Input label={t('form.name')} name="name" />
        <Input label={t('form.email')} name="email" />
        <Input label={t('form.phone')} name="tel" />
        <Input label={t('form.subject')} name="theme" />
      </div>
      <TextField name="comment" label={t('form.message')} />
      <div>
        <Checkbox label={t('form.subscribe')} checked={true} className={cls.checkbox} />
      </div>
      <Button title={t('form.submit')} />
    </form>
  )
}
