import { type FC } from 'react'
import cls from './BackToRegisterBtn.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import classnames from 'classnames'

interface BackToRegisterBtnProps {
  className?: string
}
export const BackToRegisterBtn: FC<BackToRegisterBtnProps> = ({ className }) => {
  return (
    <button className={classnames(cls.backToRegister, [className])}>
      <span>
        <ArrowIcon />
      </span>
      <span>вернуться к регистрации</span>
    </button>
  )
}
