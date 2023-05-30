import { type FC, ReactNode } from 'react'
import cls from './Tooltip.module.scss'

export enum TooltipTopPosition {
  START = 'top_start',
  CENTER = 'top_center',
  END = 'top_end',
}

export enum TooltipLeftPosition {
  START = 'left_start',
  CENTER = 'left_center',
  END = 'left_end',
}

interface TooltipProps {
  className?: string
  content: string | ReactNode
  x?: string
  y?: string
  topTransform?: TooltipTopPosition
  leftTransform?: TooltipLeftPosition
}
export const Tooltip: FC<TooltipProps> = ({
  className = '',
  content,
  x = '0%',
  y = '0%',
  topTransform = TooltipTopPosition.START,
  leftTransform = TooltipLeftPosition.START,
}) => {
  return (
    <div
      className={`${cls.tooltip} ${className} ${cls[topTransform]} ${cls[leftTransform]}`}
      style={{ left: x, top: y }}
    >
      {content}
    </div>
  )
}
