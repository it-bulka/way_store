import { type FC } from 'react'
import cls from './ToastContainer.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import { Toast } from '@/components/ui/Toast/Toast'
import { useToast } from '@/context/ToastContext'

export const ToastContainer: FC = () => {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <Portal>
      <div className={cls.container}>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </Portal>
  )
}
