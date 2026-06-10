import { type FC } from 'react'
import cls from './FAQ.module.scss'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Outlet } from 'react-router-dom'
import { FAQ_NAV_PATHS } from './faqOptions'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { useTranslation } from 'react-i18next'

interface FAQProps {
  className?: string
}

const Faq: FC<FAQProps> = ({ className = '' }) => {
  const { t } = useTranslation('faq')
  const td = t as unknown as (key: string) => string

  const options = FAQ_NAV_PATHS.map(({ id, path }) => ({
    id,
    path,
    title: td(`nav.${path}`),
  }))

  return (
    <div className={cls.FAQ + ' ' + className}>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <PageNav options={options} />
      <Outlet />
    </div>
  )
}

export default Faq
