import { AppLink } from '@/components/ui/AppLink/AppLink'
import cls from './Footer.module.scss'
const nav = [
  {
    id: '1',
    title: 'FAQ',
    path: 'faq',
  },
  {
    id: '2',
    title: 'Политика конфиденциальности',
    path: 'faq',
  },
  {
    id: '3',
    title: 'Публичная оферта',
    path: 'faq',
  },
  {
    id: '4',
    title: 'Instagram',
    path: 'faq',
  },
]

export const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.content}>
        <nav>
          <ul className={cls.links}>
            {nav.map(({ id, title, path }) => (
              <AppLink key={id} path={path} title={title} withDecoration={false} />
            ))}
          </ul>
        </nav>

        <p className={cls.copyrights}>&copy; 2021 WAYYOUCHOOSE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}
