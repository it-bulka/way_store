import { type FC, memo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import cls from './CartItem.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import { Typography } from '@/components/ui/Typography/Typography'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { COLOR_PALETTE, COLOR_LABELS, type ringsColors } from '@/models/goodsType'

interface CartItemProps {
  id: string
  img: string
  title: string
  price: number
  amount: number
  color?: ringsColors
  size?: number
  colorImages?: Partial<Record<ringsColors, string>>
  availableSizes?: number[]
  onDelete: () => void
  setAmount: (a: number) => void
  onColorChange?: (color: ringsColors, img: string | undefined) => void
  onSizeChange?: (size: number) => void
  onNavigate?: () => void
}

export const CartItem: FC<CartItemProps> = memo(({
  id,
  img,
  title,
  price,
  amount,
  color,
  size,
  colorImages,
  availableSizes,
  onDelete,
  setAmount,
  onColorChange,
  onSizeChange,
  onNavigate,
}) => {
  const colorKeys = colorImages ? (Object.keys(colorImages) as ringsColors[]) : []
  const showColors = colorKeys.length > 0

  return (
    <li className={cls.cartItem}>
      <button className={cls.deleteBtn} onClick={onDelete}>
        <CloseIcon />
      </button>

      <div className={cls.content}>
        <Link to={`/store/${id}`} className={cls.link} onClick={onNavigate}>
          <div className={cls.product}>
            <img src={img} alt={title} loading="lazy" />
          </div>
        </Link>

        <div className={cls.details}>
          <Typography className={cls.title}>{title}</Typography>

          {(showColors || (availableSizes && availableSizes.length > 0)) && (
            <div className={cls.variants}>
              {showColors && (
                <div className={cls.colorDots}>
                  {colorKeys.map(tag => (
                    <button
                      key={tag}
                      className={classnames(cls.colorDot, { [cls.active]: tag === color })}
                      style={{ backgroundColor: COLOR_PALETTE[tag] }}
                      onClick={() => onColorChange?.(tag, colorImages?.[tag])}
                      title={COLOR_LABELS[tag]}
                    />
                  ))}
                </div>
              )}

              {availableSizes && availableSizes.length > 0 && (
                <select
                  className={cls.sizeSelect}
                  value={size ?? ''}
                  onChange={e => onSizeChange?.(Number(e.target.value))}
                >
                  {availableSizes.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        <Stepper className={cls.stepper} initial={amount} getValue={setAmount} />
        <Typography className={cls.price}>
          <span>{price}</span> грн.
        </Typography>
      </div>
    </li>
  )
})

CartItem.displayName = 'CartItem'
