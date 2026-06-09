import type { FC } from 'react'
import { Modal, type ModalProps } from '@/components/ui/Modal/Modal'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Button } from '@/components/ui/Button/Button'
import cls from './NotAuthModal.module.scss'

type NotAuthModalProps = Omit<ModalProps, 'children'>

export const NotAuthModal: FC<NotAuthModalProps> = (props) => (
  <Modal {...props}>
    <div className={cls.content}>
      <ModalTitle>Функція недоступна</ModalTitle>
      <p className={cls.text}>Ця функція доступна лише авторизованим користувачам.</p>
      <Button className={cls.btn} title="Зрозуміло" onClick={props.close} />
    </div>
  </Modal>
)
