import { type FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './PurchaseHistory.module.scss'
import { Table, type IGoods } from '@/components/ui/Table/Table'
import { Absent } from '@/components/ui/Absent/Absent'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getOrders, getOrdersLoading } from '@/redux/selectors/getOrdersSelector'
import { fetchOrders } from '@/redux/async/fetchOrders'
import type { DeliveryType, OrderStatus } from '@/models/orderType'

const STATUS_EN_MAP: Record<OrderStatus, string> = {
  delivered: 'success',
  cancelled: 'cancel',
  pending: 'pending',
  processing: 'processing',
  shipped: 'shipped',
}

const DELIVERY_KEY_MAP: Record<DeliveryType, 'door' | 'pickup'> = {
  'ДО ДВЕРЕЙ': 'door',
  'ПУНКТ ВИДАЧІ': 'pickup',
}

interface PurchaseHistoryProps {
  className?: string
}

const PurchaseHistory: FC<PurchaseHistoryProps> = ({ className = '' }) => {
  const { t } = useTranslation('account')
  const { t: tCheckout } = useTranslation('checkout')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const orders = useAppSelector(getOrders)
  const loading = useAppSelector(getOrdersLoading)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const columns = [
    { header: t('purchaseHistory.columns.name'), accessorKey: 'name' },
    { header: t('purchaseHistory.columns.price'), accessorKey: 'price' },
    { header: t('purchaseHistory.columns.date'), accessorKey: 'date' },
    { header: t('purchaseHistory.columns.order'), accessorKey: 'order' },
    { header: t('purchaseHistory.columns.deliveryType'), accessorKey: 'deliveryType' },
    { header: t('purchaseHistory.columns.status'), accessorKey: 'status' },
  ]

  const tableData: IGoods[] = orders.map(order => ({
    id: order.id,
    title: order.items[0]?.title ?? '—',
    price: order.items.reduce((sum, item) => sum + item.price * item.amount, 0),
    data: order.date,
    order: order.orderNumber,
    delivery: {
      typeLabel: tCheckout(`delivery.${DELIVERY_KEY_MAP[order.deliveryType]}`),
      statusEn: STATUS_EN_MAP[order.status],
      status: t(`purchaseHistory.status.${order.status}`),
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
            info={t('purchaseHistory.empty')}
            btnTitle={t('purchaseHistory.goToStore')}
            className={cls.absent}
            onBtnClick={() => navigate('/store')}
          />
        )
      )}
    </div>
  )
}

export default PurchaseHistory
