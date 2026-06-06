import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { deliveryInfo } from './faqOptions'

export const Delivery = () => (
  <>
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      ДОСТАВКА
    </Typography>
    {deliveryInfo.map(({ title, content, id }) => (
      <Info title={title} content={content} key={id} />
    ))}
  </>
)
