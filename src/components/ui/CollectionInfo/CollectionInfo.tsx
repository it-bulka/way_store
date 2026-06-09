import { type FC } from 'react'
import cls from './CollectionInfo.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/models'

interface CollectionInfoProps {
  className?: string
  id: string
  title: string
  content: string[]
  images?: string[]
}
export const CollectionInfo: FC<CollectionInfoProps> = ({ className, id, title, content, images }) => {
  const navigateTo = useNavigate()
  const imgAmount = images?.length
  return (
    <div className={classnames(cls.collectionInfo, [className])}>
      <div className={cls.header}>
        <Typography variant="h3" className={cls.title}>
          {title}
        </Typography>
        <Button title="продовжити" onClick={() => navigateTo(APP_ROUTES.COLLECTION_DETAIL(id))} />
      </div>
      <div className={cls.content}>
        {content?.map((p, i) => (
          <Typography key={i} className={cls.paragraph}>
            {p}
          </Typography>
        ))}
      </div>
      {imgAmount && (
        <div className={classnames(cls.imgs, cls[`imgs_${imgAmount > 4 ? 4 : imgAmount}`])}>
          {images?.map((img, order) => (
            <div key={order}>
              <img src={img} alt="collection" loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
