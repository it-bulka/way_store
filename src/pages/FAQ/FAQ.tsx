import { type FC } from 'react'
import cls from './FAQ.module.scss'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Outlet } from 'react-router-dom'
import { options } from './faqOptions'

interface FAQProps {
  className?: string
}

const Faq: FC<FAQProps> = ({ className = '' }) => (
  <div className={cls.FAQ + ' ' + className}>
    <PageNav options={options} />
    <Outlet />
  </div>
)

export default Faq
