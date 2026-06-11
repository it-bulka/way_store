import { useTranslation } from 'react-i18next'
import cls from './Privacy.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const SECTION_IDS = ['1', '2', '3', '4', '5', '6', '7'] as const

const Privacy = () => {
  const { t } = useTranslation('privacy')
  const td = t as unknown as (key: string) => string

  return (
    <div className={cls.privacy}>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
        {t('pageTitle')}
      </Typography>
      <div className={cls.content}>
        <Typography className={cls.section}>{t('intro')}</Typography>
        {SECTION_IDS.map(id => (
          <div key={id}>
            <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
              {td(`sections.${id}.heading`)}
            </Typography>
            <Typography className={cls.section}>{td(`sections.${id}.body`)}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Privacy
