import { ChangeEvent, type FC, useCallback, useState } from 'react'
import cls from './RangeSlider.module.scss'
import { Tooltip, TooltipLeftPosition, TooltipTopPosition } from '@/components/ui/Tooltip/Tooltip'
import { useToggle } from '@/hooks/useToggle'

interface RangeProps {
  className?: string
  maxPossible?: number
  rangeGap?: number
  min?: number
  max?: number
}

interface IRangePositions {
  left: number
  right: number
}

type SlideType = 'min' | 'max'

export const RangeSlider: FC<RangeProps> = ({
  className = '',
  maxPossible = 500000,
  rangeGap = 20000,
  min = 1000,
  max = 500000,
}) => {
  const [isTooltipShown, setTooltipShown] = useToggle(false)
  const [tooltipContent, setTooltipContent] = useState('p.121212')
  const [tooltipX, setTooltipX] = useState<number>(0)
  const [minRange, setMinRange] = useState<string>(min.toString())
  const [maxRange, setMaxRange] = useState<string>(max.toString())
  const [rangePositions, setRangePositions] = useState<IRangePositions>({
    left: 0,
    right: 0,
  })

  const onMinRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (maxRange - value < rangeGap || value < min) return
    setMinRange(value)
    isTooltipShown && setTooltip('min')
  }

  const onMaxRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value - minRange < rangeGap || value > max) return
    setMaxRange(value)
    isTooltipShown && setTooltip('max')
  }

  const getRangePosition = useCallback(
    (min: string, max: string, maxPossible: number): IRangePositions => {
      const minVal = parseInt(min)
      const maxVal = parseInt(max)

      const left = (minVal / maxPossible) * 100
      const right = 100 - (maxVal / maxPossible) * 100

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
    setPositions(slide)
    setTooltipContent(`p.${minRange}`)
  }

  const showTooltip = (slide: SlideType) => {
    return () => {
      setTooltipShown(true)
      setTooltip(slide)
    }
  }
  const hideTooltip = () => setTooltipShown(false)

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
            onMouseLeave={hideTooltip}
            onTouchStart={showTooltip('min')}
            onTouchEnd={hideTooltip}
          />
          <input
            type="range"
            min="1000"
            max="500000"
            onChange={onMaxRangeChange}
            value={maxRange}
            onMouseEnter={showTooltip('max')}
            onMouseLeave={hideTooltip}
            onTouchStart={showTooltip('max')}
            onTouchEnd={hideTooltip}
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
