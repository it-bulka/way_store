import cls from './OrderDetail.module.scss'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Absent } from '@/components/ui/Absent/Absent'
import { OrderHeader } from './OrderHeader'
import { OrderItems } from './OrderItems'
import { OrderInfo } from './OrderInfo'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router-dom'
import { mockOrders } from '@/data/orders'
import type { IOrder } from '@/models/orderType'

const OrderDetail = () => {
  const order = useLoaderData() as IOrder | null
  const navigate = useNavigate()

  if (!order) {
    return (
      <Absent
        info="Замовлення не знайдено"
        btnTitle="До списку замовлень"
        onBtnClick={() => navigate('/account/purchase-history')}
      />
    )
  }

  return (
    <div className={cls.root}>
      <BreadCrumbs />
      <OrderHeader order={order} />
      <OrderItems items={order.items} />
      <OrderInfo order={order} />
    </div>
  )
}

export default OrderDetail

export const orderLoader = ({ params }: LoaderFunctionArgs): IOrder | null =>
  mockOrders.find(o => o.id === params.orderId) ?? null
