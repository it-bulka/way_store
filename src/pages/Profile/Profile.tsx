//import { Form } from '@/components/business/Form/Form'
//import { AppLink } from '@/components/ui/AppLink/AppLink'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { PurchaseHistory } from '@/components/business/PurchaseHistory/PurchaseHistory'

export const Profile = () => {
  return (
    <div className={''}>
      <PageNav />
      {/*<Form />
      <div>
        <AppLink title={'Выйти'} withDecoration={false} />
      </div>*/}

      <PurchaseHistory />
    </div>
  )
}
