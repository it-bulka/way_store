import { type FC, ReactNode, useRef, useState, useCallback, MouseEvent, useEffect, useId, createContext } from 'react'
import cls from './Modal.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import CloseIcon from '@/assets/general/close.svg'
import classnames from 'classnames'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export const ModalTitleContext = createContext<string>('')

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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

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
      if (e.key === 'Escape') closeHandler()
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpened) {
      setIsClosing(false)
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      timer.current && clearTimeout(timer.current as ReturnType<typeof setTimeout>)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpened, onKeyDown])

  useFocusTrap(contentRef, isOpened)

  return (
    <Portal>
      <ModalTitleContext.Provider value={titleId}>
        <div className={classnames(cls.modal, { [cls.closing]: isClosing, [cls.opened]: isOpened })}>
          <div className={cls.overlay + ' ' + cls[overlay]} onClick={closeHandler}>
            <div
              ref={contentRef}
              className={classnames(cls.content, contentClassName)}
              onClick={onContentClick}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button className={cls.closeBtn} onClick={closeHandler} aria-label="Закрити">
                <CloseIcon />
              </button>
              {children}
            </div>
          </div>
        </div>
      </ModalTitleContext.Provider>
    </Portal>
  )
}
