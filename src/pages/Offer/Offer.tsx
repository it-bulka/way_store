import cls from './Offer.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Offer = () => (
  <div className={cls.offer}>
    <PageMeta title="Договір оферти" />
    <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
      ПУБЛІЧНА ОФЕРТА
    </Typography>
    <div className={cls.content}>
      <Typography className={cls.section}>
        Цей документ є публічною офертою — пропозицією Way Store укласти договір купівлі-продажу
        ювелірних виробів на умовах, викладених нижче.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography className={cls.section}>
        Продавець зобов'язується передати у власність Покупця ювелірні вироби, а Покупець
        зобов'язується прийняти та оплатити товар відповідно до умов цього договору.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        2. ЦІНА ТА ОПЛАТА
      </Typography>
      <Typography className={cls.section}>
        Ціна товару вказана на сайті в гривнях (UAH). Оплата здійснюється за допомогою платіжних
        систем LiqPay або WayForPay. Накладений платіж здійснюється через службу доставки.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        3. ДОСТАВКА
      </Typography>
      <Typography className={cls.section}>
        Доставка здійснюється по всій Україні Новою Поштою або Укрпоштою. Строк доставки — 1–5
        робочих днів після підтвердження оплати. Вартість доставки розраховується індивідуально.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        4. ПОВЕРНЕННЯ ТА ОБМІН
      </Typography>
      <Typography className={cls.section}>
        Повернення та обмін товару здійснюється відповідно до Закону України «Про захист прав
        споживачів» протягом 14 днів з моменту отримання. Товар повинен бути у незміненому стані
        з оригінальним упакуванням.
      </Typography>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        5. КОНТАКТИ
      </Typography>
      <Typography className={cls.section}>
        Way Store · info@way-store.ua · +380 (00) 000-00-00
      </Typography>
    </div>
  </div>
)

export default Offer
