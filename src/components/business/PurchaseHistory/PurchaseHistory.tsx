import { type FC } from 'react'
import cls from './PurchaseHistory.module.scss'
import { Table } from '@/components/ui/Table/Table'
import { IGoods } from '@/components/ui/Table/Table'
import { Absent } from '@/components/ui/Absent/Absent'
import classnames from 'classnames'
const tableData: IGoods[] = [
  {
    id: '1',
    title: 'ДИЛЬВО 18 СМ',
    price: 250,
    data: new Date(2020, 5, 15),
    order: 'ENY7-47920435',
    delivery: {
      type: 'ДО ДВЕРИ',
      status: 'ВЫПОЛНЕНО',
      statusEn: 'success',
    },
  },
  {
    id: '2',
    title: 'ДИЛЬВО Groom',
    price: 250,
    data: new Date(2020, 5, 15),
    order: 'ENY7-47920435',
    delivery: {
      type: 'ПУНКТ ВЫДАЧИ',
      status: 'ОТМЕНА',
      statusEn: 'cancel',
    },
  },
]

tableData.length = 0

const columns = [
  {
    header: 'ИМЯ',
    accessorKey: 'name',
    sortType: 'text',
  },
  {
    header: 'ЦЕНА',
    accessorKey: 'price',
    sortType: 'text',
  },
  {
    header: 'ДАТА',
    accessorKey: 'date',
    sortType: 'datetime',
  },
  {
    header: 'НОМЕР ЗАКАЗА',
    accessorKey: 'order',
  },
  {
    header: 'ТИП ДОСТАВКИ',
    accessorKey: 'deliveryType',
  },
  {
    header: 'СТАТУС',
    accessorKey: 'status',
  },
]

interface PurchaseHistoryProps {
  className?: string
}

export const PurchaseHistory: FC<PurchaseHistoryProps> = ({ className = '' }) => {
  return (
    <div className={classnames(cls.purchaseHistory, [className])}>
      {tableData?.length ? (
        <Table columns={columns} data={tableData} className={cls.table} />
      ) : (
        <Absent
          info="У ВАС ПОКА НЕ БЫЛО ЗАКАЗОВ"
          btnTitle="ПЕРЕЙТИ В МАГАЗИН"
          className={cls.absent}
        />
      )}
    </div>
  )
}
