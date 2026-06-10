import { useTranslation } from 'react-i18next'
import cls from './ChangePassword.module.scss'
import { BackToRegisterBtn } from '@/components/ui/BackToRegisterBtn/BackToRegisterBtn'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'

export const ChangePassword = () => {
  const { t } = useTranslation('auth')

  return (
    <div className={cls.changePassword}>
      <ModalTitle>{t('password.changeTitle')}</ModalTitle>
      <form className={cls.form}>
        <div>
          <Input name="new-password" label={t('password.newPassword')} />
          <Input name="repeat-password" label={t('password.confirmPassword')} />
        </div>
        <Button title={t('password.loginWithNew')} type="submit" className={cls.btn} />
      </form>
      <BackToRegisterBtn />
    </div>
  )
}
