import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Payment = () => (
  <>
    <PageMeta title="Оплата" />
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      ОПЛАТА
    </Typography>
    <Info
      title="Оплата карткою онлайн"
      content={`Безпечна оплата через платіжний сервіс WayForPay. Підтримуються картки VISA та Mastercard. Дані картки шифруються і не зберігаються на наших серверах.`}
    />
    <Info
      title="Оплата при отриманні"
      content={`Оплата готівкою або карткою при отриманні замовлення у відділенні Нової Пошти. Послуга накладеного платежу тарифікується згідно з умовами перевізника.`}
    />
  </>
)
