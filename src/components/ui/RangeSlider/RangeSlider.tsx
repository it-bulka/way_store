import { type FC } from 'react'
import cls from './RangeSlider.module.scss'
import { Tooltip, TooltipLeftPosition, TooltipTopPosition } from '@/components/ui/Tooltip/Tooltip'
import classnames from 'classnames'
import { useRangeSlider } from './useRangeSlider'

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

export const RangeSlider: FC<RangeProps> = ({
  className,
  maxPossible = 500000,
  rangeGap = 20000,
  min = 1000,
  max = 500000,
  getRange,
  reset = false,
}) => {
  const {
    minRange,
    maxRange,
    minValue,
    maxValue,
    rangePositions,
    isTooltipShown,
    tooltipContent,
    tooltipX,
    onMinRangeChange,
    onMaxRangeChange,
    showTooltip,
    onStopSliding,
    refreshMinVal,
    refreshMaxVal,
  } = useRangeSlider({ min, max, maxPossible, rangeGap, getRange, reset })

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
        {/* dynamic position can't be expressed as static SCSS */}
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
