import cls from './FAQ.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'

export const Contacts = () => (
  <>
    <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
      СВЯЗАТЬСЯ С НАМИ
    </Typography>
    <div className={cls.info}>
      <Typography>
        Если у вас возникнут вопросы по поводу вашего заказа, продукта или чего-либо еще, напишите
        нам, заполнив форму запроса ниже.
      </Typography>
      <Typography>
        По вопросам оптовой торговли обращайтесь по адресу{' '}
        <a href="mailto:sales@sweetlimejuice.com">sales@sweetlimejuice.com.</a>
      </Typography>
      <Typography>
        Для прессы обращайтесь по адресу{' '}
        <a href="mailto:press@sweetlimejuice.com">press@sweetlimejuice.com</a>
      </Typography>
    </div>
    <ContactForm />
  </>
)
