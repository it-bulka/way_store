import { type ChangeEvent, useEffect, useState } from 'react'
import { useToggle } from '@/hooks/useToggle'
import { type IGetRange } from './RangeSlider'

interface IRangePositions {
  left: number
  right: number
}

const getRangePosition = (minVal: number, maxVal: number, possible: number): IRangePositions => ({
  left: (minVal / possible) * 100,
  right: 100 - (maxVal / possible) * 100,
})

type SlideType = 'min' | 'max'

interface UseRangeSliderProps {
  min: number
  max: number
  maxPossible: number
  rangeGap: number
  getRange?: IGetRange
  reset: boolean
}

export const useRangeSlider = ({
  min,
  max,
  maxPossible,
  rangeGap,
  getRange,
  reset,
}: UseRangeSliderProps) => {
  const [isTooltipShown, setTooltipShown] = useToggle(false)
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipX, setTooltipX] = useState<number>(0)
  const [minRange, setMinRange] = useState<number>(min)
  const [maxRange, setMaxRange] = useState<number>(max)
  const [minValue, setMinValue] = useState<number>(min)
  const [maxValue, setMaxValue] = useState<number>(max)
  const [rangePositions, setRangePositions] = useState<IRangePositions>({ left: 0, right: 0 })

  const setPositions = (slide: SlideType) => {
    const position = getRangePosition(minRange, maxRange, maxPossible)
    setRangePositions(position)
    setTooltipX(slide === 'min' ? position.left : 100 - position.right)
  }

  const setTooltip = (slide: SlideType) => {
    setPositions(slide)
    setTooltipContent(`${(slide === 'min' ? minRange : maxRange).toLocaleString('uk-UA')} грн.`)
  }

  const onMinRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (maxRange - value < rangeGap || value < min) return
    setMinRange(value)
    if (isTooltipShown) setTooltip('min')
  }

  const onMaxRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value - minRange < rangeGap || value > max) return
    setMaxRange(value)
    if (isTooltipShown) setTooltip('max')
  }

  const showTooltip = (slide: SlideType) => () => {
    setTooltipShown(true)
    setTooltip(slide)
  }

  const hideTooltip = () => setTooltipShown(false)

  const onStopSliding = (cb?: () => void) => () => {
    setTooltipShown(false)
    cb?.()
    getRange?.(minRange, maxRange)
  }

  const refreshMinVal = () => setMinValue(minRange)
  const refreshMaxVal = () => setMaxValue(maxRange)

  useEffect(() => {
    if (reset) {
      setMinRange(min)
      setMaxRange(max)
      setRangePositions({ left: 0, right: 0 })
    }
  }, [reset, min, max])

  return {
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
    hideTooltip,
    onStopSliding,
    refreshMinVal,
    refreshMaxVal,
  }
}
