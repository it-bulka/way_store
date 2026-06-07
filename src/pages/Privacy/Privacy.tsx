import cls from './Privacy.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Privacy = () => (
  <div className={cls.privacy}>
    <PageMeta title="Конфіденційність" />
    <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
      ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ
    </Typography>
    <div className={cls.content}>
      <Typography className={cls.section}>
        Ми поважаємо вашу конфіденційність і зобов'язуємося захищати персональні дані, які ви
        надаєте нам під час використання нашого сайту.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЯКІ ДАНІ МИ ЗБИРАЄМО
      </Typography>
      <Typography className={cls.section}>
        При реєстрації та оформленні замовлення ми збираємо: ім'я, адресу електронної пошти,
        номер телефону, адресу доставки. Ці дані використовуються виключно для обробки замовлень
        та зв'язку з вами.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЯК МИ ВИКОРИСТОВУЄМО ВАШІ ДАНІ
      </Typography>
      <Typography className={cls.section}>
        Ваші персональні дані використовуються для: обробки та доставки замовлень, надсилання
        підтверджень та сповіщень про статус замовлення, покращення якості обслуговування.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЗАХИСТ ДАНИХ
      </Typography>
      <Typography className={cls.section}>
        Ми вживаємо технічних та організаційних заходів для захисту ваших персональних даних від
        несанкціонованого доступу, зміни або розголошення.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        КОНТАКТИ
      </Typography>
      <Typography className={cls.section}>
        З питань конфіденційності звертайтеся: info@way-store.ua
      </Typography>
    </div>
  </div>
)

export default Privacy
