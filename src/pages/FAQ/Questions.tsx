import cls from './FAQ.module.scss'
import { Accordion, AccordionType } from '@/components/ui/Accordion/Accordion'
import { FAQdata } from '@/data/FAQdata'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Questions = () => (
  <>
    <PageMeta title="Питання та відповіді" />
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      ЧАСТІ ЗАПИТАННЯ
    </Typography>
    <Accordion items={FAQdata} type={AccordionType.ARROW} />
  </>
)
