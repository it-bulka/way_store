import cls from './NotFound.module.scss'
import Logo from '@/assets/logo/logo.svg'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation('common')
  return (
    <div className={cls.notFound}>
      <PageMeta title="Сторінку не знайдено" noindex />
      <div>
        <div className={cls.logo}>
          <Logo />
        </div>
        <div className="container">
          <Typography type={TypographyTypes.HEADER} variant="h1" className={cls.info}>
            {t('notFound.title')}
          </Typography>
          <AppLink
            title={t('notFound.backHome')}
            path="/"
            withDecoration={false}
            className={cls.link}
          />
        </div>
      </div>
    </div>
  )
}

export default NotFound
