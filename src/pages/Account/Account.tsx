import { PageNav } from '@/components/ui/PageNav/PageNav'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import cls from './Account.module.scss'
import { Outlet } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const options = [
  { id: '1', title: 'ПРОФІЛЬ', path: 'profile' },
  { id: '2', title: 'ІСТОРІЯ ПОКУПОК', path: 'purchase-history' },
  { id: '3', title: 'ОБРАНЕ', path: 'chosen' },
]

const Account = () => {
  return (
    <div>
      <PageMeta title="Акаунт" noindex />
      <BreadCrumbs />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
        АКАУНТ
      </Typography>
      <PageNav options={options} />
      <Outlet />
    </div>
  )
}

export default Account
