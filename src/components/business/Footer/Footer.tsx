import { useTranslation } from 'react-i18next'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { SubscriptionModal } from '@/components/ui/SubscriptionModal/SubscriptionModal'
import { useControlModal } from '@/hooks/useControlModal'
import cls from './Footer.module.scss'
import { APP_ROUTES } from '@/models'

export const Footer = () => {
  const { t } = useTranslation('common')
  const { isModalOpen, openModal, closeModal } = useControlModal(false)

  const nav = [
    { id: '1', title: 'FAQ', path: APP_ROUTES.FAQ },
    { id: '2', title: t('footer.privacy'), path: APP_ROUTES.PRIVACY },
    { id: '3', title: t('footer.offer'), path: APP_ROUTES.OFFER },
  ]

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
                {t('footer.subscribe').toUpperCase()}
              </button>
            </li>
          </ul>
        </nav>

        <p className={cls.copyrights}>{t('footer.copyright')}</p>
      </div>

      <SubscriptionModal isOpened={isModalOpen} close={closeModal} />
    </footer>
  )
}
