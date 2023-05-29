import { ChangeEvent, type FC, useCallback, useEffect, useState } from 'react'
import cls from './RangeSlider.module.scss'

interface RangeProps {
  className?: string
  maxPossible?: number
  rangeGap?: number
  min?: number
  max?: number
}

interface IRangePositions {
  left: string
  right: string
}

export const RangeSlider: FC<RangeProps> = ({
  className = '',
  maxPossible = 500000,
  rangeGap = 20000,
  min = 1000,
  max = 500000,
}) => {
  const [minRange, setMinRange] = useState<string>(min.toString())
  const [maxRange, setMaxRange] = useState<string>(max.toString())
  const [rangePositions, setRangePositions] = useState<IRangePositions>({
    left: '0%',
    right: '0%',
  })

  const onMinRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (maxRange - value < rangeGap || value < min) return
    setMinRange(value)
  }

  const onMaxRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value - minRange < rangeGap || value > max) return
    setMaxRange(value)
  }

  const getRangePosition = useCallback(
    (min: string, max: string, maxPossible: number): IRangePositions => {
      const minVal = parseInt(min)
      const maxVal = parseInt(max)

      const left = (minVal / maxPossible) * 100 + '%'
      const right = 100 - (maxVal / maxPossible) * 100 + '%'

      return { left, right }
    },
    []
  )

  useEffect(() => {
    const position = getRangePosition(minRange, maxRange, maxPossible as number)
    setRangePositions({ ...position })
  }, [minRange, maxRange, maxPossible, getRangePosition])

  return (
    <div className={cls.rangeSlider + ' ' + className}>
      <div className={cls.labels}>
        <label className={cls.label}>
          <span>р.</span>
          <input
            type="number"
            min="1000"
            max="500000"
            onChange={onMinRangeChange}
            value={minRange}
          />
        </label>

        <label className={cls.label}>
          <span>р.</span>
          <input
            type="number"
            min="1000"
            max="500000"
            onChange={onMaxRangeChange}
            value={maxRange}
          />
        </label>
      </div>
      <div className={cls.slider}>
        <div
          className={cls.progress}
          style={{ left: rangePositions.left, right: rangePositions.right }}
        />

        <div className={cls.rangeInput}>
          <input
            type="range"
            min="1000"
            max="500000"
            onChange={onMinRangeChange}
            value={minRange}
          />
          <input
            type="range"
            min="1000"
            max="500000"
            onChange={onMaxRangeChange}
            value={maxRange}
          />
        </div>
      </div>
    </div>
  )
}
