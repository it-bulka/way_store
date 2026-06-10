import { type FC, useContext } from 'react'
import cls from './ModalTitle.module.scss'
import { Typography, TypographyProps, TypographyTypes } from '@/components/ui/Typography/Typography'
import { ModalTitleContext } from '@/components/ui/Modal/Modal'

type ModalTitleProps = TypographyProps

export const ModalTitle: FC<ModalTitleProps> = ({ children, ...props }) => {
  const titleId = useContext(ModalTitleContext)

  return (
    <Typography
      id={titleId}
      className={cls.modalTitle}
      type={TypographyTypes.HEADER}
      variant="h3"
      {...props}
    >
      {children}
    </Typography>
  )
}
