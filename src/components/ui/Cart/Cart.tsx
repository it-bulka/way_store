import { FC, memo, useCallback, useEffect, useRef } from 'react'
import cls from './Cart.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import { Typography } from '@/components/ui/Typography/Typography'
import CloseIcon from '@/assets/general/close.svg'
import classnames from 'classnames'
import { Button } from '@/components/ui/Button/Button'
import { Absent } from '@/components/ui/Absent/Absent'
import { useNavigate } from 'react-router-dom'
import { CartItem } from '@/components/ui/Cart/CartItem/CartItem'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { cartActions } from '@/redux/reducers/cartSlice'
import type { ringsColors } from '@/models/goodsType'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface CartProps {
  onClose: () => void
}

export const Cart: FC<CartProps> = memo(({ onClose }) => {
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const dispatch = useAppDispatch()
  const cartInnerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(cartInnerRef, true)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const deleteItem = useCallback(
    (id: string, color?: ringsColors, size?: number) => {
      dispatch(cartActions.deleteItem({ id, color, size }))
    },
    [dispatch]
  )

  const changeItemAmount = useCallback(
    (id: string, amount: number, color?: ringsColors, size?: number): void => {
      if (amount === 0) {
        deleteItem(id, color, size)
        return
      }
      dispatch(cartActions.setItemAmount({ id, amount, color, size }))
    },
    [dispatch, deleteItem]
  )

  const toCheckout = useCallback(() => {
    onClose()
    navigateTo('/checkout')
  }, [navigateTo, onClose])

  const getTotalSum = () => {
    return items.reduce((accum, item) => {
      return accum + item.amount * item.price
    }, 0)
  }

  const getTotalAmount = () => {
    return items.reduce((accum, item) => {
      return accum + item.amount
    }, 0)
  }

  const getInfo = () => {
    const amount = getTotalAmount()
    const lastDigit = amount % 10
    const lastTwoDigits = amount % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${amount} ТОВАРІВ`
    if (lastDigit === 1) return `${amount} ТОВАР`
    if (lastDigit >= 2 && lastDigit <= 4) return `${amount} ТОВАРИ`
    return `${amount} ТОВАРІВ`
  }

  const totalSum = formatNumberIntoGroups(getTotalSum())

  return (
    <Portal>
      <div className={cls.cart} onClick={onClose}>
        <div
          ref={cartInnerRef}
          className={classnames(cls.cartInner, 'container')}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Ваш кошик"
        >
          <div className={cls.header}>
            <Typography>ВАШ КОШИК</Typography>
            <button className={cls.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className={cls.content}>
            {items.length === 0 ? (
              <Absent
                info="КОШИК ПОРОЖНІЙ"
                btnTitle="ПЕРЕЙТИ ДО МАГАЗИНУ"
                className={cls.absent}
                onBtnClick={() => { onClose(); navigateTo('/store') }}
              />
            ) : (
              <ul>
                {items.map(item => (
                  <CartItem
                    key={`${item.id}-${item.color ?? ''}-${item.size ?? ''}`}
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    amount={item.amount}
                    color={item.color}
                    size={item.size}
                    colorImages={item.colorImages}
                    availableSizes={item.availableSizes}
                    onDelete={() => deleteItem(item.id, item.color, item.size)}
                    setAmount={amount => changeItemAmount(item.id, amount, item.color, item.size)}
                    onColorChange={(newColor, newImg) =>
                      dispatch(cartActions.updateItemVariant({
                        id: item.id, oldColor: item.color, oldSize: item.size, newColor, newImg,
                      }))
                    }
                    onSizeChange={newSize =>
                      dispatch(cartActions.updateItemVariant({
                        id: item.id, oldColor: item.color, oldSize: item.size, newSize,
                      }))
                    }
                    onNavigate={onClose}
                  />
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className={cls.footer}>
              <Typography className={cls.sum}>
                {getInfo()} НА СУМУ <span>{totalSum} </span> грн.
              </Typography>
              <Button title="Оформити замовлення" onClick={toCheckout} />
            </div>
          )}
        </div>
      </div>
    </Portal>
  )
})

Cart.displayName = 'Cart'
