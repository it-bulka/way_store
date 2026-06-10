import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface IToast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toasts: IToast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 3000

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID()
      setToasts(prev => {
        const next = [...prev, { id, message, type }]
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next
      })
      setTimeout(() => removeToast(id), AUTO_DISMISS_MS)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
