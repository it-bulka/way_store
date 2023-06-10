import { type FC } from 'react'
import cls from './Absent.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import SadIcon from '@/assets/general/sad.svg'
import classnames from 'classnames'

interface AbsentProps {
  className?: string
  info: string
  btnTitle: string
  onBtnClick?: () => void
}
export const Absent: FC<AbsentProps> = ({ className, info, btnTitle, onBtnClick }) => {
  return (
    <div className={classnames(cls.absent, [className])}>
      <Typography className={cls.info}>
        <>
          <span>{info}</span>
          <span className={cls.icon}>
            <SadIcon />
          </span>
        </>
      </Typography>
      <Button title={btnTitle} onClick={onBtnClick} />
    </div>
  )
}
