/* NO need for wrapper and stopPropagation */
/* eslint jsx-a11y/click-events-have-key-events: 0,jsx-a11y/no-static-element-interactions: 0 */

import { FC, memo, useCallback } from 'react'
import cls from './Cart.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import { Typography } from '@/components/ui/Typography/Typography'
import CloseIcon from '@/assets/general/close.svg'
import classnames from 'classnames'
import { Button } from '@/components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { CartItem } from '@/components/ui/Cart/CartItem/CartItem'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { cartActions } from '@/redux/reducers/cartSlice'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'

interface CartProps {
  onClose: () => void
}

export const Cart: FC<CartProps> = memo(({ onClose }) => {
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const dispatch = useAppDispatch()

  const deleteItem = useCallback(
    (id: string) => {
      dispatch(cartActions.deleteItem({ id }))
    },
    [dispatch]
  )

  const changeItemAmount = useCallback(
    (id: string, amount: number): void => {
      if (amount === 0) {
        deleteItem(id)
        return
      }
      dispatch(cartActions.setItemAmount({ id, amount }))
    },
    [dispatch, deleteItem]
  )

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

    if (lastDigit === 1) {
      return `${amount} ТОВАР`
    }

    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return `${amount} ТОВАРА`
    }

    return `${amount} ТОВАРOВ`
  }

  const totalSum = formatNumberIntoGroups(getTotalSum())

  return (
    <Portal>
      <div className={cls.cart} onClick={onClose}>
        <div className={classnames(cls.cartInner, 'container')} onClick={e => e.stopPropagation()}>
          <div className={cls.header}>
            <Typography>ВАШИ ТОВАРЫ</Typography>
            <button className={cls.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className={cls.content}>
            <ul>
              {items.map(({ img, title, price, amount, id }) => (
                <CartItem
                  img={img}
                  title={title}
                  price={price}
                  amount={amount}
                  onDelete={() => deleteItem(id)}
                  setAmount={(amount: number) => changeItemAmount(id, amount)}
                  key={id}
                />
              ))}
            </ul>
          </div>

          <div className={cls.footer}>
            <Typography className={cls.sum}>
              {getInfo()} НА СУММУ <span>{totalSum} </span> руб.
            </Typography>
            <Button title="перейти в коризну" onClick={() => navigateTo('/account/chosen')} />
          </div>
        </div>
      </div>
    </Portal>
  )
})

Cart.displayName = 'Cart'
