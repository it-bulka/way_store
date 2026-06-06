import { Form } from '@/components/business/Form/Form'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'
import { getUserSelector } from '@/redux/selectors/getUserSelector.ts'
import { useEffect } from 'react'
import { fetchUser } from '@/redux/async/fetchUser.ts'

const Profile = () => {
  const user = useAppSelector(getUserSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser('u1'))
  }, [])

  return (
    <>
      {user && <Form user={user} />}
      <div>
        <AppLink title={'Выйти'} withDecoration={false} path="/" />
      </div>
    </>
  )
}

export default Profile
