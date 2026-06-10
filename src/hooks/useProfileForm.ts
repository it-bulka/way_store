import { useCallback } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { ObjectSchema } from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { updateUser } from '@/redux/async/updateUser'
import { getAuthUid } from '@/redux/selectors/getAuthSelector'
import { useToast } from '@/context/ToastContext'
import type { IUser } from '@/redux/types/user'

export function useProfileForm<T extends FieldValues>(schema: ObjectSchema<any>) {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(getAuthUid)
  const { addToast } = useToast()
  const form = useForm<T>({ resolver: yupResolver(schema) })

  const saveUser = useCallback(
    async (data: Partial<IUser>, successMsg = 'Дані збережено'): Promise<boolean> => {
      if (!uid) return false
      const result = await dispatch(updateUser({ userId: uid, data }))
      const ok = updateUser.fulfilled.match(result)
      addToast(ok ? successMsg : 'Помилка збереження даних', ok ? 'success' : 'error')
      return ok
    },
    [uid, dispatch, addToast]
  )

  return { ...form, saveUser }
}
