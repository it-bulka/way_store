import { type FC, memo, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Cart.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import { Absent } from '@/components/ui/Absent/Absent'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { CartHeader } from './CartHeader'
import { CartFooter } from './CartFooter'
import { CartItemWrapper } from './CartItemWrapper'
import { useCartTotals } from './useCartTotals'

interface CartProps {
  onClose: () => void
}

export const Cart: FC<CartProps> = memo(({ onClose }) => {
  const { t } = useTranslation('cart')
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const dispatch = useAppDispatch()
  const cartInnerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(cartInnerRef, true)

  const { totalSum, amountLabel } = useCartTotals(items)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const toCheckout = useCallback(() => {
    onClose()
    navigateTo('/checkout')
  }, [navigateTo, onClose])

  const toStore = useCallback(() => {
    onClose()
    navigateTo('/store')
  }, [navigateTo, onClose])

  return (
    <Portal>
      <div
        className={cls.cart}
        role="presentation"
        onClick={e => e.target === e.currentTarget && onClose()}
        onKeyDown={e => e.key === 'Escape' && onClose()}
      >
        <div
          ref={cartInnerRef}
          className={classnames(cls.cartInner, 'container')}
          role="dialog"
          aria-modal="true"
          aria-label={t('ariaLabel')}
        >
          <CartHeader onClose={onClose} />
          <div className={cls.content}>
            {items.length === 0 ? (
              <Absent
                info={t('empty')}
                btnTitle={t('goToStore')}
                className={cls.absent}
                onBtnClick={toStore}
              />
            ) : (
              <ul>
                {items.map(item => (
                  <CartItemWrapper
                    key={`${item.id}-${item.color ?? ''}-${item.size ?? ''}`}
                    item={item}
                    dispatch={dispatch}
                    onNavigate={onClose}
                  />
                ))}
              </ul>
            )}
          </div>
          {items.length > 0 && (
            <CartFooter amountLabel={amountLabel} totalSum={totalSum} onCheckout={toCheckout} />
          )}
        </div>
      </div>
    </Portal>
  )
})

Cart.displayName = 'Cart'
