import { FC } from 'react'
import { Link } from 'react-router-dom'
import cls from './CheckoutItem.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import { Typography } from '@/components/ui/Typography/Typography'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'

interface CheckoutItemProps {
  id: string
  img: string
  title: string
  price: number
  amount: number
  onDelete: () => void
  setAmount: (a: number) => void
}

export const CheckoutItem: FC<CheckoutItemProps> = ({ id, img, title, price, amount, onDelete, setAmount }) => (
  <li className={cls.item}>
    <Link to={`/store/${id}`} className={cls.link}>
      <img src={img} alt={title} className={cls.img} loading="lazy" />
      <Typography className={cls.title}>{title}</Typography>
    </Link>
    <Stepper className={cls.stepper} initial={amount} getValue={setAmount} />
    <Typography className={cls.price}>{formatNumberIntoGroups(price * amount)} грн.</Typography>
    <button className={cls.deleteBtn} onClick={onDelete}>
      <CloseIcon />
    </button>
  </li>
)
