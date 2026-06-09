import { type FC, useEffect } from 'react'
import cls from './PurchaseHistory.module.scss'
import { Table, type IGoods } from '@/components/ui/Table/Table'
import { Absent } from '@/components/ui/Absent/Absent'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getOrders, getOrdersLoading } from '@/redux/selectors/getOrdersSelector'
import { fetchOrders } from '@/redux/async/fetchOrders'
import type { OrderStatus } from '@/models/orderType'

const statusEnMap: Record<OrderStatus, string> = {
  delivered: 'success',
  cancelled: 'cancel',
  pending: 'pending',
  processing: 'processing',
  shipped: 'shipped',
}

const statusLabelMap: Record<OrderStatus, string> = {
  delivered: 'ВИКОНАНО',
  cancelled: 'СКАСОВАНО',
  pending: 'ОЧІКУЄТЬСЯ',
  processing: 'ОБРОБЛЯЄТЬСЯ',
  shipped: 'В ДОРОЗІ',
}

const columns = [
  { header: "ІМ'Я", accessorKey: 'name' },
  { header: 'ЦІНА', accessorKey: 'price' },
  { header: 'ДАТА', accessorKey: 'date' },
  { header: 'НОМЕР ЗАМОВЛЕННЯ', accessorKey: 'order' },
  { header: 'ТИП ДОСТАВКИ', accessorKey: 'deliveryType' },
  { header: 'СТАТУС', accessorKey: 'status' },
]

interface PurchaseHistoryProps {
  className?: string
}

const PurchaseHistory: FC<PurchaseHistoryProps> = ({ className = '' }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const orders = useAppSelector(getOrders)
  const loading = useAppSelector(getOrdersLoading)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const tableData: IGoods[] = orders.map(order => ({
    id: order.id,
    title: order.items[0]?.title ?? '—',
    price: order.items.reduce((sum, item) => sum + item.price * item.amount, 0),
    data: order.date,
    order: order.orderNumber,
    delivery: {
      type: order.deliveryType,
      statusEn: statusEnMap[order.status],
      status: statusLabelMap[order.status],
    },
  }))

  return (
    <div className={classnames(cls.purchaseHistory, [className])}>
      {!loading && tableData.length ? (
        <Table
          columns={columns}
          data={tableData}
          className={cls.table}
          onRowClick={id => navigate(`/account/purchase-history/${id}`)}
        />
      ) : (
        !loading && (
          <Absent
            info="У ВАС ЩЕ НЕ БУЛО ЗАМОВЛЕНЬ"
            btnTitle="ПЕРЕЙТИ ДО МАГАЗИНУ"
            className={cls.absent}
            onBtnClick={() => navigate('/store')}
          />
        )
      )}
    </div>
  )
}

export default PurchaseHistory
