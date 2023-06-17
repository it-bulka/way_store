import { useState, memo, FocusEvent, useEffect } from 'react'
import cls from './Stepper.module.scss'
import Arrow from '@/assets/general/arrow.svg'
import classnames from 'classnames'

interface StepperProps {
  className?: string
  initial?: number
  onUp?: () => void
  onDown?: () => void
  getValue?: (a: number) => void
}

export const Stepper = memo(({ className, initial = 0, onUp, onDown, getValue }: StepperProps) => {
  const [value, setValue] = useState(initial.toString())

  const onUpClick = () => {
    setValue(prev => (+prev + 1).toString())
    onDown?.()
  }

  const onDownClick = () => {
    Number(value) > 0 && setValue(prev => (+prev - 1).toString())
    onUp?.()
  }

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    getValue?.(+value)
  }, [value])

  return (
    <div className={classnames(cls.stepper, [className])}>
      <input type="number" min="0" step="1" value={value} onChange={onChange} />
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

Stepper.displayName = 'Stepper'
