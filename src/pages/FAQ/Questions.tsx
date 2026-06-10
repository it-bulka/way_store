import { useTranslation } from 'react-i18next'
import cls from './FAQ.module.scss'
import { Accordion, AccordionType } from '@/components/ui/Accordion/Accordion'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const FAQ_ITEM_IDS = ['1', '2', '3', '4', '5'] as const

export const Questions = () => {
  const { t } = useTranslation('faq')
  const td = t as unknown as (key: string) => string

  const faqItems = FAQ_ITEM_IDS.map(id => ({
    id,
    title: td(`questions.items.${id}.title`),
    content: td(`questions.items.${id}.content`),
  }))

  return (
    <>
      <PageMeta title={t('questions.pageMeta')} />
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        {t('questions.heading')}
      </Typography>
      <Accordion items={faqItems} type={AccordionType.ARROW} />
    </>
  )
}
