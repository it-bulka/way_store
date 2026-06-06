import { type FC } from 'react'
import cls from './PurchaseHistory.module.scss'
import { Table } from '@/components/ui/Table/Table'
import { IGoods } from '@/components/ui/Table/Table'
import { Absent } from '@/components/ui/Absent/Absent'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

const tableData: IGoods[] = [
  {
    id: '1',
    title: 'ДІЛЬВО 18 СМ',
    price: 250,
    data: new Date(2020, 5, 15),
    order: 'ENY7-47920435',
    delivery: {
      type: 'ДО ДВЕРЕЙ',
      status: 'ВИКОНАНО',
      statusEn: 'success',
    },
  },
  {
    id: '2',
    title: 'ДІЛЬВО Groom',
    price: 250,
    data: new Date(2020, 5, 15),
    order: 'ENY7-47920435',
    delivery: {
      type: 'ПУНКТ ВИДАЧІ',
      status: 'СКАСОВАНО',
      statusEn: 'cancel',
    },
  },
]

tableData.length = 0

const columns = [
  {
    header: "ІМ'Я",
    accessorKey: 'name',
    sortType: 'text',
  },
  {
    header: 'ЦІНА',
    accessorKey: 'price',
    sortType: 'text',
  },
  {
    header: 'ДАТА',
    accessorKey: 'date',
    sortType: 'datetime',
  },
  {
    header: 'НОМЕР ЗАМОВЛЕННЯ',
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

const PurchaseHistory: FC<PurchaseHistoryProps> = ({ className = '' }) => {
  const navigateTo = useNavigate()

  return (
    <div className={classnames(cls.purchaseHistory, [className])}>
      {tableData?.length ? (
        <Table columns={columns} data={tableData} className={cls.table} />
      ) : (
        <Absent
          info="У ВАС ЩЕ НЕ БУЛО ЗАМОВЛЕНЬ"
          btnTitle="ПЕРЕЙТИ ДО МАГАЗИНУ"
          className={cls.absent}
          onBtnClick={() => navigateTo('/store')}
        />
      )}
    </div>
  )
}

export default PurchaseHistory
