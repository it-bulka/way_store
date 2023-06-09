import cls from './ChangePassword.module.scss'
import { BackToRegisterBtn } from '@/components/ui/BackToRegisterBtn/BackToRegisterBtn'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'

export const ChangePassword = () => {
  return (
    <div className={cls.changePassword}>
      <ModalTitle>ИЗМЕНЕНИЕ ПАРОЛЯ</ModalTitle>
      <form className={cls.form}>
        <div>
          <Input name="new-password" label="НОВЫЙ ПАРОЛЬ" />
          <Input name="repeat-password" label="ПОВТОРИТЕ ПАРОЛЬ" />
        </div>
        <Button title="ВОЙТИ С НОВЫМ ПАРОЛЕМ " type="submit" className={cls.btn} />
      </form>

      <BackToRegisterBtn />
    </div>
  )
}
