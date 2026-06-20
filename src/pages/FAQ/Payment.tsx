import { useTranslation } from 'react-i18next'
import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Payment = () => {
  const { t } = useTranslation('faq')

  return (
    <>
      <PageMeta title={t('payment.pageMeta')} />
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        {t('payment.heading')}
      </Typography>
      <Info title={t('payment.card.title')} content={t('payment.card.content')} />
      <Info
        title={t('payment.cashOnDelivery.title')}
        content={t('payment.cashOnDelivery.content')}
      />
    </>
  )
}
