import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import CartIcon from '@/assets/general/cart.svg'
import cls from './CartButton.module.scss'
import { Cart } from '@/components/ui/Cart/Cart'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { useControlModal } from '@/hooks/useControlModal'

export const CartButton = memo(() => {
  const { t } = useTranslation('cart')
  const items = useAppSelector(getCartItems)
  const { isModalOpen, openModal, closeModal } = useControlModal(false)
  const totalAmount = useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])

  return (
    <>
      <button
        onClick={openModal}
        className={classnames(cls.cartBtn, { [cls.active]: !!items.length })}
        aria-label={totalAmount ? t('ariaLabelWithItems', { count: totalAmount }) : t('ariaLabel')}
      >
        <CartIcon />
        {!!items.length && (
          <p className={cls.items} aria-live="polite" aria-atomic="true">
            {totalAmount}
          </p>
        )}
      </button>
      {isModalOpen && <Cart onClose={closeModal} />}
    </>
  )
})

CartButton.displayName = 'CartButton'
