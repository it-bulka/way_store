import { type FC, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './PrevNextBtns.module.scss'
import Arrow from '@/assets/general/arrow.svg'
import classnames from 'classnames'

interface PageSwitcherProps {
  onPrevClick: () => void
  onNextClick: () => void
  disablePrev?: boolean
  disableNext?: boolean
}

export const PrevNextBtns: FC<PageSwitcherProps> = memo(
  ({ onPrevClick, onNextClick, disablePrev = false, disableNext = false }) => {
    const { t } = useTranslation('common')

    const prevClickHandler = useCallback(() => {
      onPrevClick && onPrevClick()
    }, [onPrevClick])

    const nextClickHandler = useCallback(() => {
      onNextClick && onNextClick()
    }, [onNextClick])

    return (
      <div className={cls.btns}>
        <button
          className={classnames(cls.prev, { [cls.disabled]: disablePrev })}
          onClick={prevClickHandler}
          disabled={disablePrev}
        >
          <span className={cls.arrow}>
            <Arrow />
          </span>
          <span>{t('actions.prev')}</span>
        </button>
        <div className={cls.divider} />
        <button
          className={classnames(cls.next, { [cls.disabled]: disableNext })}
          onClick={nextClickHandler}
          disabled={disableNext}
        >
          <span>{t('actions.next')}</span>
          <span className={cls.arrow}>
            <Arrow />
          </span>
        </button>
      </div>
    )
  }
)

PrevNextBtns.displayName = 'PrevNextBtns'
