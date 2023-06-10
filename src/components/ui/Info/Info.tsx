import { type FC } from 'react'
import cls from './Info.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import classnames from 'classnames'

interface InfoProps {
  className?: string
  title: string
  content: string
}
export const Info: FC<InfoProps> = ({ className, title, content }) => {
  return (
    <div className={classnames(cls.info, [className])}>
      <Typography className={cls.title}>{title}</Typography>
      <Typography>{content}</Typography>
    </div>
  )
}
