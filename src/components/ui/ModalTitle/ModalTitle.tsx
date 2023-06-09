import { type FC } from 'react'
import cls from './ModalTitle.module.scss'
import { Typography, TypographyProps, TypographyTypes } from '@/components/ui/Typography/Typography'

type ModalTitleProps = TypographyProps

export const ModalTitle: FC<ModalTitleProps> = ({ children, ...props }) => {
  return (
    <Typography className={cls.modalTitle} type={TypographyTypes.HEADER} variant="h3" {...props}>
      {children}
    </Typography>
  )
}
