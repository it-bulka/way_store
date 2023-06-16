import { PageNav } from '@/components/ui/PageNav/PageNav'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import cls from './Account.module.scss'
import { Outlet } from 'react-router-dom'

const options = [
  { id: '1', title: 'ПРОФИЛЬ', path: 'profile' },
  { id: '2', title: 'ИСТОРИЯ ПОКУПОК', path: 'purchase-history' },
  { id: '3', title: 'ИЗБРАННОЕ', path: 'chosen' },
]

const Account = () => {
  return (
    <div>
      <BreadCrumbs />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
        АККАУНТ
      </Typography>
      <PageNav options={options} />
      <Outlet />
    </div>
  )
}

export default Account
