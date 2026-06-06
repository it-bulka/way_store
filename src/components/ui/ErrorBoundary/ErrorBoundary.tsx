import { Component, type PropsWithChildren, type ReactNode } from 'react'
import cls from './ErrorBoundary.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={cls.fallback}>
          <Typography>Щось пішло не так :(</Typography>
          <Button title="На головну" onClick={() => window.location.replace('/')} />
        </div>
      )
    }
    return this.props.children
  }
}
