import { type FC } from 'react'
import cls from './FAQ.module.scss'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Outlet } from 'react-router-dom'
import { options } from './faqOptions'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

interface FAQProps {
  className?: string
}

const Faq: FC<FAQProps> = ({ className = '' }) => (
  <div className={cls.FAQ + ' ' + className}>
    <PageMeta
      title="Часті запитання"
      description="Відповіді на питання про доставку, оплату та повернення Way Store."
    />
    <PageNav options={options} />
    <Outlet />
  </div>
)

export default Faq
