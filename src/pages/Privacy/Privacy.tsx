import cls from './Privacy.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Privacy = () => (
  <div className={cls.privacy}>
    <PageMeta
      title="Політика конфіденційності"
      description="Як WAYYOUCHOOSE збирає, зберігає та захищає ваші персональні дані"
    />
    <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
      ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ
    </Typography>
    <div className={cls.content}>
      <Typography className={cls.section}>
        WAYYOUCHOOSE поважає вашу приватність. Ця політика пояснює, які персональні дані ми
        збираємо, як використовуємо та захищаємо їх під час роботи з нашим сайтом і сервісами.
        Використовуючи сайт, ви погоджуєтесь із умовами цієї політики.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЯКІ ДАНІ МИ ЗБИРАЄМО
      </Typography>
      <Typography className={cls.section}>
        При реєстрації та оформленні замовлення ми збираємо: ім'я та прізвище, адресу електронної
        пошти, номер телефону, адресу доставки (місто, вулиця, будинок, квартира). Автоматично
        можуть фіксуватися: IP-адреса, тип браузера, сторінки, які ви переглядали, та час
        відвідування — виключно в агрегованому вигляді для аналітики.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЯК МИ ВИКОРИСТОВУЄМО ВАШІ ДАНІ
      </Typography>
      <Typography className={cls.section}>
        Зібрані дані використовуються для: обробки та підтвердження замовлень; організації доставки
        через Нову Пошту, Укрпошту або кур'єра; надсилання сповіщень про статус замовлення (SMS,
        email); відповіді на ваші запити та звернення; покращення якості сервісу і зручності сайту.
        Ми не використовуємо ваші дані для продажу або передачі третім особам у маркетингових цілях.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ФАЙЛИ COOKIE ТА АНАЛІТИКА
      </Typography>
      <Typography className={cls.section}>
        Сайт використовує технічні файли cookie, необхідні для коректної роботи (авторизація,
        збереження кошика). Аналітичні дані збираються анонімно і не дозволяють ідентифікувати
        конкретну особу. Ви можете вимкнути cookies у налаштуваннях браузера, однак це може обмежити
        функціональність сайту.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ПЕРЕДАЧА ДАНИХ ТРЕТІМ ОСОБАМ
      </Typography>
      <Typography className={cls.section}>
        Для виконання замовлень ми передаємо необхідні дані: службам доставки (Нова Пошта, Укрпошта)
        — ім'я та адресу отримувача; платіжним системам (LiqPay, WayForPay) — лише технічні дані
        транзакції; Google Firebase — для зберігання даних облікового запису на захищених серверах.
        Ці партнери зобов'язані дотримуватися законодавства про захист даних і не мають права
        використовувати їх для власних цілей.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ЗАХИСТ ТА ЗБЕРІГАННЯ ДАНИХ
      </Typography>
      <Typography className={cls.section}>
        Ваші дані зберігаються на захищених серверах Google Cloud (Firebase) з шифруванням при
        передачі (HTTPS/TLS) та в спокої. Доступ до персональних даних мають лише авторизовані
        співробітники, яким він необхідний для виконання службових обов'язків. Ми зберігаємо дані
        протягом часу, необхідного для виконання зобов'язань, але не довше ніж передбачено
        законодавством України.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        ВАШІ ПРАВА
      </Typography>
      <Typography className={cls.section}>
        Відповідно до ст. 8 Закону України «Про захист персональних даних» ви маєте право: знати,
        які дані про вас зберігаються; вимагати їх виправлення або оновлення; відкликати згоду на
        обробку та вимагати видалення; оскаржити дії з вашими даними. Для реалізації цих прав
        зверніться до нас за контактами нижче.
      </Typography>

      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.heading}>
        КОНТАКТИ З ПИТАНЬ КОНФІДЕНЦІЙНОСТІ
      </Typography>
      <Typography className={cls.section}>
        Якщо у вас є запитання щодо обробки ваших персональних даних, напишіть нам:
        info@way-store.ua. Ми відповімо протягом 5 робочих днів.
      </Typography>
    </div>
  </div>
)

export default Privacy
