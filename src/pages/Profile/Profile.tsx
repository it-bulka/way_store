import { Form } from '@/components/business/Form/Form'
import { AppLink } from '@/components/ui/AppLink/AppLink'

export const Profile = () => {
  return (
    <div className={''}>
      <Form />
      <div>
        <AppLink title={'Выйти'} withDecoration={false} />
      </div>
    </div>
  )
}
