import { type FC } from 'react'
import cls from './Table.module.scss'
import Ring from '@/assets/goods/Ring 1.jpg'
import { Typography } from '@/components/ui/Typography/Typography'
import ArrowIcon from '@/assets/general/arrow.svg'
import { formatDate } from '@/utils/formatDate'

interface Column {
  [key: string]: string | undefined
  header: string
  accessorKey: string
}
interface TableProps {
  className?: string
  data: IGoods[]
  columns: Column[]
}
export interface IGoods {
  id: string
  title: string
  price: number
  data: Date
  order: string
  delivery: {
    type: 'ДО ДВЕРИ' | 'ПУНКТ ВЫДАЧИ'
    status: 'ВЫПОЛНЕНО' | 'ОТМЕНА'
    statusEn: 'success' | 'cancel'
  }
}

interface StyleClasses {
  [key: string]: string
}
const cellsSize: StyleClasses = {
  name: cls.cell_1,
  order: cls.cell_4,
  deliverytype: cls.cell_5,
  status: cls.statusHead,
}

export const Table: FC<TableProps> = ({ className = '', data, columns }) => {
  console.log({ data, columns })

  return (
    <table className={cls.table + ' ' + className}>
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
                <img src={Ring} alt="ring" />
                <Typography>{tr.title}</Typography>
              </div>
            </td>
            <td>{tr.price} грн</td>
            <td>{formatDate(tr.data)}</td>
            <td>{tr.order}</td>
            <td>{tr.delivery.type}</td>
            <td>
              <div className={cls.status}>
                <div className={cls.dot + ' ' + cls[tr.delivery.statusEn]} />
                <Typography className={cls.text}>{tr.delivery.status}</Typography>
                <button className={cls.btn}>
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
