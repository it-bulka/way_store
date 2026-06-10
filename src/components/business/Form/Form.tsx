import { type FC } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { IUser } from '@/redux/types/user.ts'
import { InfoForm } from './InfoForm'
import { AddressForm } from './AddressForm'
import { PasswordForm } from './PasswordForm'

interface FormProps {
  className?: string
  user: IUser
}

export const Form: FC<FormProps> = ({ className, user }) => (
  <div className={classnames(cls.form, [className])}>
    <div className={cls.col}>
      <InfoForm
        name={user.name}
        email={user.email}
        sex={user.sex}
        phone={user.phone}
        birthday={user.birthday}
      />
      <PasswordForm />
    </div>
    <AddressForm address={user.address} comment={user.comment} />
  </div>
)
