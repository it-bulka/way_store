import { type FC, memo } from 'react'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import cls from './Cart.module.scss'

interface CartFooterProps {
  amountLabel: string
  totalSum: string
  onCheckout: () => void
}

export const CartFooter: FC<CartFooterProps> = memo(({ amountLabel, totalSum, onCheckout }) => (
  <div className={cls.footer}>
    <Typography className={cls.sum}>
      {amountLabel} НА СУМУ <span>{totalSum} </span> грн.
    </Typography>
    <Button title="Оформити замовлення" onClick={onCheckout} />
  </div>
))

CartFooter.displayName = 'CartFooter'
