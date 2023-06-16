import cls from './NotFound.module.scss'
import Logo from '@/assets/logo/logo.svg'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'

const NotFound = () => {
  return (
    <div className={cls.notFound}>
      <div>
        <div className={cls.logo}>
          <Logo />
        </div>
        <Typography type={TypographyTypes.HEADER} variant="h1" className={cls.info}>
          Page Not Found
        </Typography>
        <AppLink
          title="Вернуться на главную"
          path="/"
          withDecoration={false}
          className={cls.link}
        />
      </div>
    </div>
  )
}

export default NotFound
