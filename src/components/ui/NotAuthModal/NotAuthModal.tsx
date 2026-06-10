import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, type ModalProps } from '@/components/ui/Modal/Modal'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Button } from '@/components/ui/Button/Button'
import cls from './NotAuthModal.module.scss'

type NotAuthModalProps = Omit<ModalProps, 'children'>

export const NotAuthModal: FC<NotAuthModalProps> = props => {
  const { t } = useTranslation('auth')

  return (
    <Modal {...props}>
      <div className={cls.content}>
        <ModalTitle>{t('notAuthModal.title')}</ModalTitle>
        <p className={cls.text}>{t('notAuthModal.text')}</p>
        <Button className={cls.btn} title={t('notAuthModal.ok')} onClick={props.close} />
      </div>
    </Modal>
  )
}
