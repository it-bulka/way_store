import { type FC } from 'react'
import cls from './CollectionInfo.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import classnames from 'classnames'

interface CollectionInfoProps {
  className?: string
  title: string
  data: { id: string; content: string }[]
  images?: string[]
}
export const CollectionInfo: FC<CollectionInfoProps> = ({ className, title, data, images }) => {
  const imgAmount = images?.length
  return (
    <div className={classnames(cls.collectionInfo, [className])}>
      <div className={cls.header}>
        <Typography variant="h3" className={cls.title}>
          {title}
        </Typography>
        <Button title="продолжить" />
      </div>
      <div className={cls.content}>
        {data?.map(p => (
          <Typography key={p.id} className={cls.paragraph}>
            {p.content}
          </Typography>
        ))}
      </div>
      {imgAmount && (
        <div className={classnames(cls.imgs, cls[`imgs_${imgAmount > 4 ? 4 : imgAmount}`])}>
          {images?.map((img, order) => (
            <div>
              <img src={img} alt="collection" key={order} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
