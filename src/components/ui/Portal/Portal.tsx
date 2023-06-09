import { type FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  container?: HTMLElement
}
export const Portal: FC<PortalProps> = ({ children, container = document.body }) => {
  return createPortal(children, container as HTMLElement)
}
