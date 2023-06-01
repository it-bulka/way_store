import { type FC, useCallback, memo } from 'react'
import cls from './PrevNextBtns.module.scss'
import Arrow from '@/assets/general/arrow.svg'

interface PageSwitcherProps {
  onPrevClick: () => void
  onNextClick: () => void
}

export const PrevNextBtns: FC<PageSwitcherProps> = memo(({ onPrevClick, onNextClick }) => {
  const prevClickHandler = useCallback(() => {
    onPrevClick && onPrevClick()
  }, [onPrevClick])

  const nextClickHandler = useCallback(() => {
    onNextClick && onNextClick()
  }, [onNextClick])

  return (
    <div className={cls.btns}>
      <button className={cls.prev} onClick={prevClickHandler}>
        <span className={cls.arrow}>
          <Arrow />
        </span>
        <span>Пред.</span>
      </button>
      <div className={cls.divider} />
      <button className={cls.next} onClick={nextClickHandler}>
        <span>След.</span>
        <span className={cls.arrow}>
          <Arrow />
        </span>
      </button>
    </div>
  )
})
