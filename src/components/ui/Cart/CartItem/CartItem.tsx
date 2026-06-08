import { type FC } from 'react'
import { Link } from 'react-router-dom'
import cls from './CartItem.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import { Typography } from '@/components/ui/Typography/Typography'
import { Stepper } from '@/components/ui/Stepper/Stepper'

interface CartItemProps {
  id: string
  img: string
  title: string
  price: number
  amount: number
  onDelete: () => void
  setAmount: (a: number) => void
  onNavigate?: () => void
}

export const CartItem: FC<CartItemProps> = ({ id, img, title, price, amount, onDelete, setAmount, onNavigate }) => {
  return (
    <li className={cls.cartItem}>
      <button className={cls.deleteBtn} onClick={() => onDelete()}>
        <CloseIcon />
      </button>

      <div className={cls.content}>
        <Link to={`/store/${id}`} className={cls.link} onClick={onNavigate}>
          <div className={cls.product}>
            <img src={img} alt={title} loading="lazy" />
          </div>
          <Typography className={cls.title}>{title}</Typography>
        </Link>
        <Stepper className={cls.stepper} initial={amount} getValue={setAmount} />
        <Typography className={cls.price}>
          <span>{price}</span> грн.
        </Typography>
      </div>
    </li>
  )
}
