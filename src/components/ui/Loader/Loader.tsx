import cls from './Loader.module.scss'
import Logo from '@/assets/logo/logo.svg'

export const Loader = () => {
  return (
    <div className={cls.loader}>
      <div className={cls.logo}>
        <Logo />
      </div>
    </div>
  )
}
