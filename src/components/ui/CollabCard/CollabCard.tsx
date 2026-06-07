import { type FC } from 'react'
import cls from './CollabCard.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface CollabCardProps {
  className?: string
  id: string
  img: string
  title: string
  content: string | string[]
}
export const CollabCard: FC<CollabCardProps> = ({ className, id, img, title, content }) => {
  const navigateTo = useNavigate()
  return (
    <div className={classnames(cls.collabCard, [className])}>
      <div>
        <img src={img} alt={title} loading="lazy" />
      </div>
      <div className={cls.content}>
        <Typography variant="h3" type={TypographyTypes.HEADER}>
          {title}
        </Typography>
        {content && Array.isArray(content) ? (
          <div>
            {content.map((text, order) => (
              <Typography key={order}>{text}</Typography>
            ))}
          </div>
        ) : (
          <Typography>{content}</Typography>
        )}
        <Button title="продолжить" className={cls.btn} onClick={() => navigateTo(id)} />
      </div>
    </div>
  )
}
