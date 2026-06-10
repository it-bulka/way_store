import cls from './Offer.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Offer = () => (
  <div className={cls.offer}>
    <PageMeta
      title="Публічна оферта"
      description="Умови договору купівлі-продажу ювелірних виробів WAYYOUCHOOSE"
    />
    <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
      ПУБЛІЧНА ОФЕРТА
    </Typography>
    <div className={cls.content}>
      <Typography className={cls.section}>
        Цей документ є публічною офертою інтернет-магазину WAYYOUCHOOSE (далі — Продавець) —
        пропозицією укласти договір купівлі-продажу ювелірних виробів на умовах, викладених нижче.
        Оформлення замовлення на сайті є беззастережним акцептом цієї оферти відповідно до ст. 642
        Цивільного кодексу України.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography className={cls.section}>
        Продавець зобов'язується передати у власність Покупця ювелірні вироби з золота 585°/750°,
        срібла 925°, платини 950° та дорогоцінних каменів відповідно до замовлення, а Покупець —
        прийняти та оплатити товар на умовах цього договору. Характеристики товару (метал, камені,
        вага, розмір) зазначені на відповідній сторінці сайту.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        2. ПОРЯДОК ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
      </Typography>
      <Typography className={cls.section}>
        Замовлення оформлюється через сайт шляхом додавання товару до кошика та заповнення форми з
        контактними даними та адресою доставки. Після оформлення Покупець отримує підтвердження на
        вказану електронну адресу. Продавець залишає за собою право зв'язатися з Покупцем для
        уточнення деталей замовлення перед відправленням.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        3. ЦІНА ТА ОПЛАТА
      </Typography>
      <Typography className={cls.section}>
        Ціна товару вказана на сайті в гривнях (UAH) і включає ПДВ. Продавець залишає за собою право
        змінювати ціни без попереднього повідомлення; ціна на момент оформлення замовлення є
        кінцевою. Оплата здійснюється: онлайн — через платіжні системи LiqPay або WayForPay (картки
        Visa/Mastercard); накладеним платежем — при отриманні у відділенні Нової Пошти (комісія
        служби доставки сплачується Покупцем).
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        4. ДОСТАВКА
      </Typography>
      <Typography className={cls.section}>
        Доставка здійснюється по всій Україні. Способи доставки: Нова Пошта (1–3 робочих дні);
        Укрпошта (3–7 робочих днів); кур'єрська доставка по Києву та партнерських містах
        (узгоджується окремо). Строк відправлення — 1–2 робочих дні після підтвердження оплати.
        Вартість доставки розраховується при оформленні замовлення. Ризик випадкового знищення або
        пошкодження товару переходить до Покупця з моменту отримання.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        5. ПОВЕРНЕННЯ ТА ОБМІН
      </Typography>
      <Typography className={cls.section}>
        Повернення та обмін здійснюється відповідно до Закону України «Про захист прав споживачів»
        протягом 14 днів з моменту отримання. Умови: товар не був у використанні, збережено
        оригінальне пакування та ярлики, наявний документ про купівлю. Ювелірні вироби, виготовлені
        або підібрані за індивідуальним замовленням (персоналізований розмір, гравіювання),
        поверненню та обміну не підлягають. Витрати на зворотню доставку несе Покупець, якщо
        повернення не пов'язане з виробничим дефектом.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        6. ГАРАНТІЯ
      </Typography>
      <Typography className={cls.section}>
        На всі вироби надається гарантія 12 місяців з дня отримання. Гарантія поширюється на
        виробничі дефекти: порушення цілісності кріплень, відпаювання деталей, дефекти камінців у
        заводський обробці. Гарантія не поширюється на механічні пошкодження, деформацію внаслідок
        неправильного використання, природне зношення поверхні. Гарантійне обслуговування
        проводиться у нашому ательє в Києві або поштою.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        7. ВІДПОВІДАЛЬНІСТЬ СТОРІН
      </Typography>
      <Typography className={cls.section}>
        Продавець не несе відповідальності за затримки доставки, спричинені службою доставки або
        обставинами форс-мажору (воєнні дії, стихійні лиха, рішення органів влади). У разі
        неможливості виконання замовлення з незалежних від Продавця причин Покупець отримує повне
        відшкодування сплаченої суми протягом 5 робочих днів.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        8. РЕКВІЗИТИ ПРОДАВЦЯ
      </Typography>
      <Typography className={cls.section}>
        WAYYOUCHOOSE · Київ, Україна · info@way-store.ua · +380 (44) 000-00-00
      </Typography>
    </div>
  </div>
)

export default Offer
