import { useTranslation } from 'react-i18next'
import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Contacts = () => {
  const { t } = useTranslation('faq')

  return (
    <>
      <PageMeta title={t('contacts.pageMeta')} />
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        {t('contacts.heading')}
      </Typography>
      <div className={cls.info}>
        <Typography>{t('contacts.description')}</Typography>
        <Typography>
          {t('contacts.wholesale')} <a href="mailto:wholesale@way.com.ua">wholesale@way.com.ua</a>
        </Typography>
        <Typography>
          {t('contacts.media')} <a href="mailto:press@way.com.ua">press@way.com.ua</a>
        </Typography>
      </div>
      <ContactForm />
    </>
  )
}
