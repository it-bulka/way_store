/* There is window EventListener set for keyboard interaction */
/* eslint jsx-a11y/click-events-have-key-events: 0,jsx-a11y/no-static-element-interactions: 0 */

import { type FC, ReactNode, useRef, useState, useCallback, MouseEvent, useEffect } from 'react'
import cls from './Modal.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import CloseIcon from '@/assets/general/close.svg'
import classnames from 'classnames'

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
      <div className={classnames(cls.modal, { [cls.closing]: isClosing, [cls.opened]: isOpened })}>
        <div className={cls.overlay + ' ' + cls[overlay]} onClick={closeHandler}>
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
