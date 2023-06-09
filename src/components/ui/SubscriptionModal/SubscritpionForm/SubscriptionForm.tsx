import cls from './SubscriptionForm.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

export const SubscriptionForm = () => {
  return (
    <form className={cls.subscribtionForm}>
      <Typography type={TypographyTypes.HEADER} variant="h3" className={cls.title}>
        Подпишитесь на нас чтобы получать уведомления о новых коллекциях, коллаборациях и скидках.
      </Typography>
      <div className={cls.fields}>
        <Input name="email" label="e-mail" />
        <Input name="name" label="Имя" />
      </div>
      <Button title="подписаться" />
    </form>
  )
}
