import { useTranslation } from 'react-i18next'
import { Form } from '@/components/business/Form/Form'
import { Loader } from '@/components/ui/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'
import { getUserSelector } from '@/redux/selectors/getUserSelector.ts'
import { getAuthUid } from '@/redux/selectors/getAuthSelector'
import { useEffect } from 'react'
import { fetchUser } from '@/redux/async/fetchUser.ts'
import { useToast } from '@/context/ToastContext'

const Profile = () => {
  const { t } = useTranslation('account')
  const user = useAppSelector(getUserSelector)
  const uid = useAppSelector(getAuthUid)
  const dispatch = useAppDispatch()
  const { addToast } = useToast()

  useEffect(() => {
    if (!uid) return
    dispatch(fetchUser(uid))
      .unwrap()
      .catch(() => addToast(t('profile.loadError'), 'error'))
  }, [uid, dispatch, addToast, t])

  if (!user) return <Loader />

  return <Form user={user} />
}

export default Profile
