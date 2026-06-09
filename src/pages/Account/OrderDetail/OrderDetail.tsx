import cls from './OrderDetail.module.scss'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Absent } from '@/components/ui/Absent/Absent'
import { OrderHeader } from './OrderHeader'
import { OrderItems } from './OrderItems'
import { OrderInfo } from './OrderInfo'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/base/firebase'
import { store } from '@/redux/store'
import type { IOrder } from '@/models/orderType'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

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
      <PageMeta title="Деталі замовлення" noindex />
      <BreadCrumbs />
      <OrderHeader order={order} />
      <OrderItems items={order.items} />
      <OrderInfo order={order} />
    </div>
  )
}

export default OrderDetail

export const orderLoader = async ({ params }: LoaderFunctionArgs): Promise<IOrder | null> => {
  const existing = store.getState().orders.orders.find(o => o.id === params.orderId)
  if (existing) return existing

  const uid = store.getState().auth.uid
  if (!uid) return null
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'orders', params.orderId!))
    return snap.exists() ? ({ ...snap.data(), id: snap.id } as IOrder) : null
  } catch {
    return null
  }
}
