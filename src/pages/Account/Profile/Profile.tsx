import { Form } from '@/components/business/Form/Form'
import { Loader } from '@/components/ui/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'
import { getUserSelector } from '@/redux/selectors/getUserSelector.ts'
import { getAuthUid } from '@/redux/selectors/getAuthSelector'
import { useEffect } from 'react'
import { fetchUser } from '@/redux/async/fetchUser.ts'

const Profile = () => {
  const user = useAppSelector(getUserSelector)
  const uid = useAppSelector(getAuthUid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (uid) dispatch(fetchUser(uid))
  }, [uid])

  if (!user) return <Loader />

  return <Form user={user} />
}

export default Profile
