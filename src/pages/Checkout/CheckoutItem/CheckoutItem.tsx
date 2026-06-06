import { FC } from 'react'
import cls from './CheckoutItem.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'

interface CheckoutItemProps {
  img: string
  title: string
  price: number
  amount: number
}

export const CheckoutItem: FC<CheckoutItemProps> = ({ img, title, price, amount }) => (
  <li className={cls.item}>
    <img src={img} alt={title} className={cls.img} loading="lazy" />
    <Typography className={cls.title}>{title}</Typography>
    <Typography className={cls.qty}>× {amount}</Typography>
    <Typography className={cls.price}>{formatNumberIntoGroups(price * amount)} грн.</Typography>
  </li>
)
