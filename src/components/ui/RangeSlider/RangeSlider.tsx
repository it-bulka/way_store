import { ChangeEvent, type FC, useCallback, useEffect, useState } from 'react'
import cls from './RangeSlider.module.scss'
import { Tooltip, TooltipLeftPosition, TooltipTopPosition } from '@/components/ui/Tooltip/Tooltip'
import { useToggle } from '@/hooks/useToggle'
import classnames from 'classnames'

export interface IGetRange {
  (min: number, max: number): void
}
interface RangeProps {
  className?: string
  maxPossible?: number
  rangeGap?: number
  min?: number
  max?: number
  getRange?: IGetRange
  reset?: boolean
}

interface IRangePositions {
  left: number
  right: number
}

type SlideType = 'min' | 'max'

export const RangeSlider: FC<RangeProps> = ({
  className,
  maxPossible = 500000,
  rangeGap = 20000,
  min = 1000,
  max = 500000,
  getRange,
  reset = false,
}) => {
  const [isTooltipShown, setTooltipShown] = useToggle(false)
  const [tooltipContent, setTooltipContent] = useState('p.121212')
  const [tooltipX, setTooltipX] = useState<number>(0)
  const [minRange, setMinRange] = useState<number>(min as number)
  const [maxRange, setMaxRange] = useState<number>(max as number)
  const [minValue, setMinValue] = useState<number>(min as number)
  const [maxValue, setMaxValue] = useState<number>(max as number)
  const [rangePositions, setRangePositions] = useState<IRangePositions>({
    left: 0,
    right: 0,
  })

  const onMinRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (maxRange - value < rangeGap || value < min) return
    setMinRange(value)
    isTooltipShown && setTooltip('min')
  }

  const onMaxRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value - minRange < rangeGap || value > max) return
    setMaxRange(value)
    isTooltipShown && setTooltip('max')
  }

  const getRangePosition = useCallback(
    (min: number, max: number, maxPossible: number): IRangePositions => {
      const left = (min / maxPossible) * 100
      const right = 100 - (max / maxPossible) * 100

      return { left, right }
    },
    []
  )

  //TODO: correct shift of Tooltip
  const setPositions = (slide: SlideType) => {
    const position = getRangePosition(minRange, maxRange, maxPossible as number)
    setRangePositions(position)

    const y = slide === 'min' ? position.left : 100 - position.right
    setTooltipX(y)
  }

  const setTooltip = (slide: SlideType) => {
    const content = slide === 'min' ? minRange : maxRange
    setPositions(slide)
    setTooltipContent(`p.${content}`)
  }

  const showTooltip = (slide: SlideType) => {
    return () => {
      setTooltipShown(true)
      setTooltip(slide)
    }
  }
  const onStopSliding = (cb?: () => void) => {
    return () => {
      setTooltipShown(false)
      cb && cb()
      getRange && getRange(minRange, maxRange)
    }
  }

  const refreshMinVal = () => setMinValue(minRange)
  const refreshMaxVal = () => setMaxValue(maxRange)

  useEffect(() => {
    if (reset) {
      setMinRange(min)
      setMaxRange(max)
      setRangePositions({ left: 0, right: 0 })
    }
  }, [reset])

  return (
    <div className={classnames(cls.rangeSlider, [className])}>
      <div className={cls.labels}>
        <label className={cls.label}>
          <span>р.</span>
          <input
            type="number"
            min="1000"
            max="500000"
            onChange={onMinRangeChange}
            value={minValue}
          />
        </label>

        <label className={cls.label}>
          <span>р.</span>
          <input
            type="number"
            min="1000"
            max="500000"
            onChange={onMaxRangeChange}
            value={maxValue}
          />
        </label>
      </div>
      <div className={cls.slider}>
        <div
          className={cls.progress}
          style={{ left: rangePositions.left + '%', right: rangePositions.right + '%' }}
        />

        <div className={cls.rangeInput}>
          <input
            type="range"
            min="1000"
            max="500000"
            onChange={onMinRangeChange}
            value={minRange}
            onMouseEnter={showTooltip('min')}
            onMouseLeave={onStopSliding()}
            onMouseUp={refreshMinVal}
            onTouchStart={showTooltip('min')}
            onTouchEnd={onStopSliding(refreshMinVal)}
          />
          <input
            type="range"
            min="1000"
            max="500000"
            onChange={onMaxRangeChange}
            value={maxRange}
            onMouseEnter={showTooltip('max')}
            onMouseLeave={onStopSliding()}
            onMouseUp={refreshMaxVal}
            onTouchStart={showTooltip('max')}
            onTouchEnd={onStopSliding(refreshMaxVal)}
          />

          {isTooltipShown && (
            <Tooltip
              content={tooltipContent}
              y={-12 + 'px'}
              x={tooltipX + '%'}
              topTransform={TooltipTopPosition.END}
              leftTransform={TooltipLeftPosition.CENTER}
            />
          )}
        </div>
      </div>
    </div>
  )
}
