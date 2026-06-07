import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Contacts = () => (
  <>
    <PageMeta title="Контакти" />
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      КОНТАКТИ
    </Typography>
    <div className={cls.info}>
      <Typography>
        Якщо у вас є питання щодо замовлення, продукту або чого-небудь іншого — заповніть форму
        нижче і ми відповімо протягом одного робочого дня.
      </Typography>
      <Typography>
        З питань оптових замовлень:{' '}
        <a href="mailto:wholesale@way.com.ua">wholesale@way.com.ua</a>
      </Typography>
      <Typography>
        Для медіа та преси:{' '}
        <a href="mailto:press@way.com.ua">press@way.com.ua</a>
      </Typography>
    </div>
    <ContactForm />
  </>
)
