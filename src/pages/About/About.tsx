import { useNavigate } from 'react-router-dom'
import cls from './About.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { Button } from '@/components/ui/Button/Button'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import Img1 from '@/assets/home/img-1.jpg'
import Img2 from '@/assets/home/img-2.jpg'
import Img3 from '@/assets/home/img-3.jpg'

const VALUES = [
  {
    id: '1',
    title: 'МАЙСТЕРНІСТЬ',
    content:
      'Ручна робота та авторський підхід на кожному етапі. Жоден виріб не залишає майстерню без фінального контролю якості — від вибору металу до застібки.',
  },
  {
    id: '2',
    title: 'МАТЕРІАЛИ',
    content:
      'Золото 585° та 750°, срібло 925°, платина 950°. Дорогоцінне каміння виключно з підтвердженим походженням. Нічого зайвого — тільки суть.',
  },
  {
    id: '3',
    title: 'ВІЧНІСТЬ',
    content:
      'Ми не слідуємо за трендами — ми їх уникаємо навмисно. WAY — це вибір, що не застаріє через сезон і не вийде з моди через рік.',
  },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className={cls.about}>
      <BreadCrumbs />

      <section className={cls.hero}>
        <div className={cls.heroText}>
          <h1 className={cls.heroTitle}>WAY</h1>
          <Typography className={cls.heroTagline}>Обираємо назавжди</Typography>
        </div>
        <div className={cls.heroImage}>
          <img src={Img3} alt="Way jewelry" loading="lazy" />
        </div>
      </section>

      <section className={cls.story}>
        <Typography variant="h2" type={TypographyTypes.HEADER}>
          ПРО НАС
        </Typography>
        <div className={cls.storyContent}>
          <div className={cls.storyText}>
            <Typography>
              WAY — це київський ювелірний бренд, заснований на переконанні, що справжня прикраса
              не повинна кричати. Вона повинна говорити. Тихо, впевнено, вічно.
            </Typography>
            <Typography>
              Ми працюємо з золотом, сріблом та платиною вищих проб. Кожен виріб проходить через
              руки майстрів, які розуміють метал не як матеріал, а як мову. Форми, що ми обираємо —
              мінімальні. Сенс, що ми вкладаємо — максимальний.
            </Typography>
          </div>
          <img src={Img1} alt="Майстерня WAY" className={cls.storyImage} loading="lazy" />
        </div>
      </section>

      <section className={cls.values}>
        {VALUES.map(({ id, title, content }) => (
          <Info key={id} title={title} content={content} className={cls.value} />
        ))}
      </section>

      <blockquote className={cls.quote}>
        <Typography className={cls.quoteText}>
          «Прикраса — це не про красу. Це про те, ким ти обираєш бути.»
        </Typography>
      </blockquote>

      <section className={cls.atelier}>
        <img src={Img2} alt="Ательє WAY" className={cls.atelierImage} loading="lazy" />
        <div className={cls.atelierText}>
          <Typography variant="h2" type={TypographyTypes.HEADER}>
            НАША МАЙСТЕРНЯ
          </Typography>
          <Typography>
            Невелика команда дизайнерів та ювелірів у серці Києва. Ми переконані: менше людей —
            більше уваги до кожного виробу. Кожна колекція починається з ескізу на папері й
            завершується виробом, що хочеться торкатися знову і знову.
          </Typography>
        </div>
      </section>

      <section className={cls.cta}>
        <Button title="ДИВИТИСЬ КОЛЕКЦІЇ" onClick={() => navigate('/store')} />
      </section>
    </div>
  )
}

export default About
