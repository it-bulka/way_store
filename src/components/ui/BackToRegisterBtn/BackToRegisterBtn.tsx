import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './BackToRegisterBtn.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import classnames from 'classnames'

interface BackToRegisterBtnProps {
  className?: string
}

export const BackToRegisterBtn: FC<BackToRegisterBtnProps> = ({ className }) => {
  const { t } = useTranslation('auth')

  return (
    <button className={classnames(cls.backToRegister, [className])}>
      <span>
        <ArrowIcon />
      </span>
      <span>{t('backToRegister')}</span>
    </button>
  )
}
