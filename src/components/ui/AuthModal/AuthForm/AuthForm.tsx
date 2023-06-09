import cls from './AuthForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import EyeIcon from '@/assets/general/eye.svg'
import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'

const RegisterForm = () => {
  return (
    <form>
      <ModalTitle>регистрация</ModalTitle>
      <Input name="e-mail" label="e-mail" />
      <Input name="name" label="фио" />
      <Input name="password" label="пароль" addendum={<EyeIcon />} />
      <Input name="tel" label="телефон" />
      <div>
        <Button title="зарегестрироваться" className={cls.btn} />
      </div>
    </form>
  )
}

const LoginForm = () => {
  return (
    <form>
      <ModalTitle>вход</ModalTitle>
      <Input name="e-mail" label="e-mail" />
      <Input name="password" label="пароль" addendum={<EyeIcon />} />
      <button className={cls.link} role="link">
        забыли пароль?
      </button>
      <div>
        <Button title="войти" className={cls.btn} />
      </div>
      <Checkbox label="оставаться в системе" checked={true} />
    </form>
  )
}
export const AuthForm = () => {
  return (
    <div className={cls.authForm}>
      <div className={cls.content}>
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  )
}
