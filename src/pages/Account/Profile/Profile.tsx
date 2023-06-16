import { Form } from '@/components/business/Form/Form'
import { AppLink } from '@/components/ui/AppLink/AppLink'

const Profile = () => {
  return (
    <>
      <Form />
      <div>
        <AppLink title={'Выйти'} withDecoration={false} path="/" />
      </div>
    </>
  )
}

export default Profile
