import { type FC } from 'react'
import { Modal, ModalProps } from '@/components/ui/Modal/Modal'
import { SubscriptionForm } from './SubscritpionForm/SubscriptionForm'
import cls from './SubscriptionModal.module.scss'

type SubscriptionModalProps = Omit<ModalProps, 'children'>

export const SubscriptionModal: FC<SubscriptionModalProps> = props => {
  return (
    <Modal {...props} overlay="off" contentClassName={cls.content}>
      <SubscriptionForm />
    </Modal>
  )
}
