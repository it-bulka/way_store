import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Table.module.scss'
import Ring from '@/assets/goods/Ring 1.jpg'
import { Typography } from '@/components/ui/Typography/Typography'
import ArrowIcon from '@/assets/general/arrow.svg'
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge/OrderStatusBadge'
import { formatDate } from '@/utils/formatDate.tsx'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import classnames from 'classnames'

interface Column {
  [key: string]: string | undefined
  header: string
  accessorKey: string
}

export interface IGoods {
  id: string
  title: string
  price: number
  data: Date
  order: string
  delivery: {
    typeLabel: string
    status: string
    statusEn: string
  }
}

interface TableProps {
  className?: string
  data: IGoods[]
  columns: Column[]
  onRowClick?: (id: string) => void
}

const cellsSize: { [key: string]: string } = {
  name: cls.cell_1,
  order: cls.cell_4,
  deliverytype: cls.cell_5,
  status: cls.statusHead,
}

export const Table: FC<TableProps> = ({ className, data, columns, onRowClick }) => {
  const { t } = useTranslation('account')

  return (
    <table className={classnames(cls.table, [className])}>
      <thead>
        <tr>
          {columns.map(head => (
            <th className={cellsSize[head.accessorKey.toLowerCase()]} key={head.accessorKey}>
              {head.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(tr => (
          <tr key={tr.id}>
            <td>
              <div className={cls.name}>
                <img src={Ring} alt="ring" loading="lazy" />
                <Typography>{tr.title}</Typography>
              </div>
            </td>
            <td>{formatNumberIntoGroups(tr.price)} {t('currency')}</td>
            <td>{formatDate(tr.data)}</td>
            <td>{tr.order}</td>
            <td>{tr.delivery.typeLabel}</td>
            <td>
              <div className={cls.status}>
                <OrderStatusBadge status={tr.delivery.statusEn} label={tr.delivery.status} />
                <button className={cls.btn} onClick={() => onRowClick?.(tr.id)}>
                  <ArrowIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
