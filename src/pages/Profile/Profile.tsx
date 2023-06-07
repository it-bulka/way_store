import { Form } from '@/components/business/Form/Form'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { PageNav } from '@/components/ui/PageNav/PageNav'

export const Profile = () => {
  return (
    <div className={''}>
      <PageNav />
      <Form />
      <div>
        <AppLink title={'Выйти'} withDecoration={false} />
      </div>
    </div>
  )
}
