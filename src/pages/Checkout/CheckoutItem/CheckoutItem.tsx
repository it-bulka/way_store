import { FC } from 'react'
import { Link } from 'react-router-dom'
import cls from './CheckoutItem.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import { Typography } from '@/components/ui/Typography/Typography'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import { COLOR_LABELS, type ringsColors } from '@/models/goodsType'

interface CheckoutItemProps {
  id: string
  img: string
  title: string
  price: number
  amount: number
  color?: ringsColors
  size?: number
  onDelete: () => void
  setAmount: (a: number) => void
}

export const CheckoutItem: FC<CheckoutItemProps> = ({
  id,
  img,
  title,
  price,
  amount,
  color,
  size,
  onDelete,
  setAmount,
}) => {
  const variantLabel = [color && COLOR_LABELS[color], size && `Розмір: ${size}`]
    .filter(Boolean)
    .join(' / ')

  return (
    <li className={cls.item}>
      <Link to={`/store/${id}`} className={cls.link}>
        <img src={img} alt={title} className={cls.img} loading="lazy" />
        <div className={cls.info}>
          <Typography className={cls.title}>{title}</Typography>
          {variantLabel && <Typography className={cls.variant}>{variantLabel}</Typography>}
        </div>
      </Link>
      <Stepper className={cls.stepper} initial={amount} getValue={setAmount} />
      <Typography className={cls.price}>{formatNumberIntoGroups(price * amount)} грн.</Typography>
      <button className={cls.deleteBtn} onClick={onDelete}>
        <CloseIcon />
      </button>
    </li>
  )
}
