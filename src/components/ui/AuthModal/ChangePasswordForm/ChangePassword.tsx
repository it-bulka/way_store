import cls from './ChangePassword.module.scss'
import { BackToRegisterBtn } from '@/components/ui/BackToRegisterBtn/BackToRegisterBtn'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'

export const ChangePassword = () => {
  return (
    <div className={cls.changePassword}>
      <ModalTitle>ЗМІНА ПАРОЛЯ</ModalTitle>
      <form className={cls.form}>
        <div>
          <Input name="new-password" label="НОВИЙ ПАРОЛЬ" />
          <Input name="repeat-password" label="ПОВТОРІТЬ ПАРОЛЬ" />
        </div>
        <Button title="УВІЙТИ З НОВИМ ПАРОЛЕМ" type="submit" className={cls.btn} />
      </form>
      <BackToRegisterBtn />
    </div>
  )
}
