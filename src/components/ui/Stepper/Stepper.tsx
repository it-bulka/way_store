import { useState, memo } from 'react'
import cls from './Stepper.module.scss'
import Arrow from '@/assets/general/arrow.svg'

export const Stepper = memo(() => {
  const [value, setValue] = useState('')

  const onUpClick = () => {
    setValue(prev => (+prev + 1).toString())
  }

  const onDownClick = () => {
    value > 0 && setValue(prev => (+prev - 1).toString())
  }
  return (
    <div className={cls.stepper}>
      <input
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className={cls.arrows}>
        <button className={cls.arrow} onClick={onUpClick}>
          <Arrow />
        </button>
        <button className={cls.arrow} onClick={onDownClick}>
          <Arrow />
        </button>
      </div>
    </div>
  )
})
