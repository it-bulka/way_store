import { type FC } from 'react'
import cls from './CartItem.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import { Typography } from '@/components/ui/Typography/Typography'
import { Stepper } from '@/components/ui/Stepper/Stepper'

interface CartItemProps {
  img: string
  title: string
  price: number
  amount: number
  onDelete: () => void
  setAmount: (a: number) => void
}

export const CartItem: FC<CartItemProps> = ({ img, title, price, amount, onDelete, setAmount }) => {
  return (
    <li className={cls.cartItem}>
      <button className={cls.deleteBtn} onClick={() => onDelete()}>
        <CloseIcon />
      </button>

      <div className={cls.content}>
        <div className={cls.product}>
          <img src={img} alt={title} />
        </div>

        <Typography className={cls.title}>{title}</Typography>
        <Stepper className={cls.stepper} initial={amount} getValue={setAmount} />
        <Typography className={cls.price}>
          <span>{price}</span> руб.
        </Typography>
      </div>
    </li>
  )
}
