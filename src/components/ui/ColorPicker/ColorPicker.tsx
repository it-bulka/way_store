import { type FC, useState } from 'react'
import cls from './ColorPicker.module.scss'

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
            className={cls.btn + ' ' + (active.id === id && cls.active)}
            style={{ backgroundColor: color }}
            onClick={() => setActive({ id, color })}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}
