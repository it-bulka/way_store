import { type FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@/components/ui/Typography/Typography'
import CloseIcon from '@/assets/general/close.svg'
import cls from './Cart.module.scss'

interface CartHeaderProps {
  onClose: () => void
}

export const CartHeader: FC<CartHeaderProps> = memo(({ onClose }) => {
  const { t } = useTranslation('cart')
  return (
    <div className={cls.header}>
      <Typography>{t('title')}</Typography>
      <button className={cls.closeBtn} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  )
})

CartHeader.displayName = 'CartHeader'
