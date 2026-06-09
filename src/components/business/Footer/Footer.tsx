import { AppLink } from '@/components/ui/AppLink/AppLink'
import { SubscriptionModal } from '@/components/ui/SubscriptionModal/SubscriptionModal'
import { useControlModal } from '@/hooks/useControlModal'
import cls from './Footer.module.scss'
import { APP_ROUTES } from '@/models'

const nav = [
  { id: '1', title: 'FAQ',                       path: APP_ROUTES.FAQ },
  { id: '2', title: 'Політика конфіденційності',  path: APP_ROUTES.PRIVACY },
  { id: '3', title: 'Публічна оферта',            path: APP_ROUTES.OFFER },
  { id: '4', title: 'Instagram',                  path: 'faq' },
]

export const Footer = () => {
  const { isModalOpen, openModal, closeModal } = useControlModal(false)

  return (
    <footer className={cls.footer}>
      <div className={`${cls.content} container`}>
        <nav>
          <ul className={cls.links}>
            {nav.map(({ id, title, path }) => (
              <AppLink key={id} path={path} title={title} withDecoration={false} />
            ))}
            <li>
              <button className={cls.subscribeBtn} onClick={openModal}>
                ПІДПИСАТИСЯ
              </button>
            </li>
          </ul>
        </nav>

        <p className={cls.copyrights}>&copy; 2021 WAYYOUCHOOSE. ALL RIGHTS RESERVED.</p>
      </div>

      <SubscriptionModal isOpened={isModalOpen} close={closeModal} />
    </footer>
  )
}
