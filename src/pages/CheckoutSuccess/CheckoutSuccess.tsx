import { useEffect, useState } from 'react'
import cls from './CheckoutSuccess.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { cartActions } from '@/redux/reducers/cartSlice'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import { useNavigate } from 'react-router-dom'

const CheckoutSuccess = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector(getCartItems)

  const [orderNumber] = useState(() => crypto.randomUUID().slice(0, 8).toUpperCase())
  const [snapshot] = useState(() => items)

  useEffect(() => {
    dispatch(cartActions.clearCart())
  }, [dispatch])

  const total = snapshot.reduce((sum, item) => sum + item.price * item.amount, 0)

  return (
    <div className={cls.root}>
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.heading}>
        ЗАМОВЛЕННЯ ОФОРМЛЕНО
      </Typography>

      <Typography className={cls.orderNum}>
        Номер замовлення: <span>{orderNumber}</span>
      </Typography>

      {snapshot.length > 0 && (
        <ul className={cls.items}>
          {snapshot.map(item => (
            <li key={item.id} className={cls.item}>
              <img src={item.img} alt={item.title} className={cls.img} />
              <Typography className={cls.title}>{item.title}</Typography>
              <Typography className={cls.qty}>× {item.amount}</Typography>
              <Typography className={cls.price}>
                {formatNumberIntoGroups(item.price * item.amount)} грн.
              </Typography>
            </li>
          ))}
        </ul>
      )}

      <Typography type={TypographyTypes.HEADER} className={cls.total}>
        РАЗОМ: <span>{formatNumberIntoGroups(total)} грн.</span>
      </Typography>

      <Button
        title="Продовжити покупки"
        onClick={() => navigate('/store')}
        className={cls.btn}
      />
    </div>
  )
}

export default CheckoutSuccess
