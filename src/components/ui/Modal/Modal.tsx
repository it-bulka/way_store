import { type FC, ReactNode, useRef, useState, useCallback, MouseEvent, useEffect } from 'react'
import cls from './Modal.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import CloseIcon from '@/assets/general/close.svg'

export interface ModalProps {
  className?: string
  contentClassName?: string
  children: ReactNode
  close: () => void
  isOpened: boolean
  overlay?: 'on' | 'off'
}

const ANIMATION_TIME = 400

export const Modal: FC<ModalProps> = ({
  children,
  close,
  isOpened,
  overlay = 'on',
  contentClassName,
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(0)

  const closeHandler = useCallback(() => {
    if (close) {
      setIsClosing(true)
      timer.current = setTimeout(() => {
        close()
      }, ANIMATION_TIME)
    }
  }, [close])

  const onContentClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpened) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      timer.current && clearTimeout(timer.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpened, onKeyDown])
  return (
    <Portal>
      <div
        className={cls.modal + ' ' + (isClosing && cls.closing) + ' ' + (isOpened && cls.opened)}
      >
        {/* There is window EventListener for keyboard interaction */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={cls.overlay + ' ' + cls[overlay]} onClick={closeHandler}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={cls.content + ' ' + contentClassName} onClick={onContentClick}>
            <button className={cls.closeBtn} onClick={closeHandler}>
              <CloseIcon />
            </button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
