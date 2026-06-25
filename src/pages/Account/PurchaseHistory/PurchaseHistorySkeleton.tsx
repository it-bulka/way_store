import { type FC } from 'react'
import cls from './PurchaseHistorySkeleton.module.scss'

const ROW_COUNT = 4

const RowSkeleton = () => (
  <div className={cls.row}>
    <div className={cls.nameCell}>
      <div className={cls.img} />
      <div className={cls.nameText} />
    </div>
    <div className={cls.cell} />
    <div className={cls.cell} />
    <div className={cls.cell} />
    <div className={cls.cellWide} />
    <div className={cls.statusCell}>
      <div className={cls.dot} />
      <div className={cls.statusText} />
      <div className={cls.arrow} />
    </div>
  </div>
)

export const PurchaseHistorySkeleton: FC = () => (
  <div className={cls.skeleton}>
    <div className={cls.header}>
      {['28%', '10%', '10%', '15%', '22%', '15%'].map((w, i) => (
        <div key={i} className={cls.headerCell} style={{ width: w }} />
      ))}
    </div>
    {Array.from({ length: ROW_COUNT }, (_, i) => (
      <RowSkeleton key={i} />
    ))}
  </div>
)
