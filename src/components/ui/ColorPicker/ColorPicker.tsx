import { type FC, useState } from 'react'
import cls from './ColorPicker.module.scss'
import classnames from 'classnames'

interface IOption {
  id: string
  color: string
}

interface ColorPickerProps {
  title: string
  options: IOption[]
}
export const ColorPicker: FC<ColorPickerProps> = ({ title, options }) => {
  const [active, setActive] = useState(options[0])
  return (
    <div className={cls.colorPicker}>
      <p>{title}</p>
      <div className={cls.holder}>
        {options?.map(({ id, color }) => (
          <button
            className={classnames(cls.btn, { [cls.active]: active.id === id })}
            style={{ backgroundColor: color }}
            onClick={() => setActive({ id, color })}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}
