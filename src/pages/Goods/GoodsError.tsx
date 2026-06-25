import { useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cls from './GoodsError.module.scss'

export const GoodsError = () => {
  const error = useRouteError() as Error
  const { t } = useTranslation('goods')

  return (
    <div className={cls.fallback}>
      <p>{t('error')}</p>
      {import.meta.env.DEV && <pre className={cls.detail}>{error?.message}</pre>}
    </div>
  )
}
