import { useTranslation } from 'react-i18next'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import cls from './Account.module.scss'
import { Outlet } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Account = () => {
  const { t } = useTranslation('account')

  const options = [
    { id: '1', title: t('nav.profile'), path: 'profile' },
    { id: '2', title: t('nav.purchaseHistory'), path: 'purchase-history' },
    { id: '3', title: t('nav.chosen'), path: 'chosen' },
  ]

  return (
    <div>
      <PageMeta title={t('meta.title')} noindex />
      <BreadCrumbs />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
        {t('title')}
      </Typography>
      <PageNav options={options} />
      <Outlet />
    </div>
  )
}

export default Account
