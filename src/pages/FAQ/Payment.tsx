import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'

export const Payment = () => (
  <>
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      Оплата
    </Typography>
    <Info
      title="Оплата онлайн"
      content={`Оплата происходит через авторизационный сервер Процессингового центра Сбербанка с использованием Банковских кредитных карт следующих платежных систем:\n– VISA International\n– MasterCard World Wide`}
    />
  </>
)
