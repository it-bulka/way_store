import cls from './FAQ.module.scss'
import { Accordion, AccordionType } from '@/components/ui/Accordion/Accordion'
import { FAQdata } from '@/data/FAQdata'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'

export const Questions = () => (
  <>
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      ЧАСТІ ЗАПИТАННЯ
    </Typography>
    <Accordion items={FAQdata} type={AccordionType.ARROW} />
  </>
)
