import { type FC } from 'react'
import cls from './GoodsPageSkeleton.module.scss'

export const GoodsPageSkeleton: FC = () => (
  <div className={cls.skeleton}>
    <div className={cls.title}>
      <div className={cls.titleText} />
      <div className={cls.titleNav} />
    </div>
    <div className={cls.content}>
      <div className={cls.col1}>
        <div className={cls.mainImg} />
        <div className={cls.thumbs}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={cls.thumb} />
          ))}
        </div>
      </div>
      <div className={cls.col2}>
        <div className={cls.name} />
        <div className={cls.price} />
        <div className={cls.controls} />
        <div className={cls.colorRow}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cls.colorDot} />
          ))}
        </div>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={cls.accordionItem} />
        ))}
      </div>
    </div>
  </div>
)
