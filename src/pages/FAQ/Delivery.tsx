import { useTranslation } from 'react-i18next'
import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Delivery = () => {
  const { t } = useTranslation('faq')

  return (
    <>
      <PageMeta title={t('delivery.pageMeta')} />
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        {t('delivery.heading')}
      </Typography>
      <Info title={t('delivery.novaPoshta.title')} content={t('delivery.novaPoshta.content')} />
      <Info title={t('delivery.courier.title')} content={t('delivery.courier.content')} />
    </>
  )
}
