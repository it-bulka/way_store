import cls from './Footer.module.scss'
const nav = [
  {
    id: '1',
    title: 'FAQ',
  },
  {
    id: '2',
    title: 'Политика конфиденциальности',
  },
  {
    id: '3',
    title: 'Публичная оферта',
  },
  {
    id: '4',
    title: 'Instagram',
  },
]

export const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.content}>
        <nav>
          <ul className={cls.links}>
            {nav.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        </nav>

        <p className={cls.copyrights}>&copy; 2021 WAYYOUCHOOSE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}
