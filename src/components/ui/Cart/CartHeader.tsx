import { type FC, memo } from 'react'
import { Typography } from '@/components/ui/Typography/Typography'
import CloseIcon from '@/assets/general/close.svg'
import cls from './Cart.module.scss'

interface CartHeaderProps {
  onClose: () => void
}

export const CartHeader: FC<CartHeaderProps> = memo(({ onClose }) => (
  <div className={cls.header}>
    <Typography>ВАШ КОШИК</Typography>
    <button className={cls.closeBtn} onClick={onClose}>
      <CloseIcon />
    </button>
  </div>
))

CartHeader.displayName = 'CartHeader'
