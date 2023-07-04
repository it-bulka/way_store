import { type FC, useState } from 'react'
import cls from './ColorPicker.module.scss'
import classnames from 'classnames'
import { ringsColors } from '@/models/goodsType.ts'

export interface IOption {
  id: string
  tag: ringsColors
  color: string
}

interface ColorPickerProps {
  title: string
  options: IOption[]
  onClick?: (color: ringsColors) => void
}
export const ColorPicker: FC<ColorPickerProps> = ({ title, options, onClick }) => {
  const [active, setActive] = useState(options[0])
  const clickHandler = (color: IOption) => {
    setActive(color)
    onClick?.(color.tag)
  }
  return (
    <div className={cls.colorPicker}>
      <p>{title}</p>
      <div className={cls.holder}>
        {options?.map(({ id, color, tag }) => (
          <button
            className={classnames(cls.btn, { [cls.active]: active.id === id })}
            style={{ backgroundColor: color }}
            onClick={() => clickHandler({ id, color, tag })}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}
