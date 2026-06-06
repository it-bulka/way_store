import { type FC } from 'react'
import cls from './Form.module.scss'
import classnames from 'classnames'
import { IUser, type Sex } from '@/redux/types/user.ts'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IFormValues } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schema'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { updateUser } from '@/redux/async/updateUser'
import { getAuthUid } from '@/redux/selectors/getAuthSelector'
import { useToast } from '@/context/ToastContext'
import { InfoForm } from './InfoForm'
import { AddressForm } from './AddressForm'

interface FormProps {
  className?: string
  user: IUser
}

export const Form: FC<FormProps> = ({ className, user }) => {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(getAuthUid)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(formSchema) })

  const submitHandler: SubmitHandler<IFormValues> = async data => {
    if (!uid) return
    const userUpdate: Partial<IUser> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      sex: data.sex as Sex,
      birthday: {
        day: Number(data.day),
        month: Number(data.month),
        year: Number(data.year),
      },
      address: {
        city: data.city,
        street: data.street ?? '',
        home: Number(data.home),
        apartment: data.apartment ?? '',
        entrance: data.entrance ?? '',
        index: Number(data.index),
        floor: Number(data.floor),
      },
      comment: data.comment ?? '',
    }
    const result = await dispatch(updateUser({ userId: uid, data: userUpdate }))
    if (updateUser.fulfilled.match(result)) {
      addToast('Дані збережено', 'success')
    } else {
      addToast('Помилка збереження даних', 'error')
    }
  }

  return (
    <form
      noValidate
      className={classnames(cls.form, [className])}
      onSubmit={handleSubmit(submitHandler)}
    >
      <InfoForm
        name={user.name}
        email={user.email}
        sex={user.sex}
        phone={user.phone}
        birthday={user.birthday}
        register={register}
        errors={errors}
      />
      <AddressForm address={user.address} comment={user.comment} register={register} errors={errors} />
    </form>
  )
}
