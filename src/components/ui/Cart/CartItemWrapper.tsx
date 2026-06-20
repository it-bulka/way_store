import { type FC, memo, useCallback } from 'react'
import { CartItem } from '@/components/ui/Cart/CartItem/CartItem'
import { cartActions } from '@/redux/reducers/cartSlice'
import type { ICartItem } from '@/redux/types/cartTypes'
import type { AppDispatch } from '@/redux/store'
import type { ringsColors } from '@/models/goodsType'

interface CartItemWrapperProps {
  item: ICartItem
  dispatch: AppDispatch
  onNavigate: () => void
}

export const CartItemWrapper: FC<CartItemWrapperProps> = memo(({ item, dispatch, onNavigate }) => {
  const { id, color, size } = item

  const onDelete = useCallback(() => {
    dispatch(cartActions.deleteItem({ id, color, size }))
  }, [dispatch, id, color, size])

  const setAmount = useCallback(
    (amount: number) => {
      if (amount === 0) {
        dispatch(cartActions.deleteItem({ id, color, size }))
      } else {
        dispatch(cartActions.setItemAmount({ id, amount, color, size }))
      }
    },
    [dispatch, id, color, size]
  )

  const onColorChange = useCallback(
    (newColor: ringsColors, newImg: string | undefined) => {
      dispatch(
        cartActions.updateItemVariant({ id, oldColor: color, oldSize: size, newColor, newImg })
      )
    },
    [dispatch, id, color, size]
  )

  const onSizeChange = useCallback(
    (newSize: number) => {
      dispatch(cartActions.updateItemVariant({ id, oldColor: color, oldSize: size, newSize }))
    },
    [dispatch, id, color, size]
  )

  return (
    <CartItem
      id={id}
      img={item.img}
      title={item.title}
      price={item.price}
      amount={item.amount}
      color={color}
      size={size}
      colorImages={item.colorImages}
      availableSizes={item.availableSizes}
      onDelete={onDelete}
      setAmount={setAmount}
      onColorChange={onColorChange}
      onSizeChange={onSizeChange}
      onNavigate={onNavigate}
    />
  )
})

CartItemWrapper.displayName = 'CartItemWrapper'
