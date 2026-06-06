import { type FC } from 'react'
import cls from './Toast.module.scss'
import classnames from 'classnames'
import CloseIcon from '@/assets/general/close.svg'
import type { IToast, ToastType } from '@/context/ToastContext'

interface ToastProps extends IToast {
  onClose: (id: string) => void
}

const typeIcon: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export const Toast: FC<ToastProps> = ({ id, message, type, onClose }) => (
  <div className={classnames(cls.toast, cls[type])}>
    <span className={cls.icon}>{typeIcon[type]}</span>
    <span className={cls.message}>{message}</span>
    <button className={cls.closeBtn} onClick={() => onClose(id)} aria-label="Закрити">
      <CloseIcon />
    </button>
  </div>
)
