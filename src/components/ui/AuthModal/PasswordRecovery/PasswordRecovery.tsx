import { type FC, useState } from 'react'
import cls from './PasswordRecovery.module.scss'
import { ModalTitle } from '@/components/ui/ModalTitle/ModalTitle'
import { Typography } from '@/components/ui/Typography/Typography'
import { Input } from '@/components/ui/Input/Input'
import { BackToRegisterBtn } from '@/components/ui/BackToRegisterBtn/BackToRegisterBtn'
import { Button } from '@/components/ui/Button/Button'

interface PasswordRecoveryProps {
  className?: string
}
export const PasswordRecovery: FC<PasswordRecoveryProps> = ({ className = '' }) => {
  const [isSubmitted, setSubmitted] = useState(false)
  return (
    <div className={cls.recovery + ' ' + className}>
      <ModalTitle>восстановление пароля</ModalTitle>
      {isSubmitted ? (
        <Typography className={cls.info}>
          ЕСЛИ АККАУНТ “alvost97@gmail.com” СУЩЕСТВУЕТ, ВАМ БУДЕТ ОТПРАВЛЕНО ЭЛЕКТРОННОЕ ПИСЬМО С
          ДАЛЬНЕЙШИМИ ИНСТРУКЦИЯМИ
        </Typography>
      ) : (
        <>
          <Typography className={cls.info}>
            введите e-mail адрес указанный при регистрации и следуйте дальнейшИМ инструкциЯМ
          </Typography>
          <form className={cls.form}>
            <Input name="email" label="email" />
            <Button
              title="сбросить пароль "
              type="submit"
              className={cls.btn}
              onClick={() => setSubmitted(prev => !prev)}
            />
          </form>
        </>
      )}

      <BackToRegisterBtn />
    </div>
  )
}
