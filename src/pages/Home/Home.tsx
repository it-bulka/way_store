import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import cls from './Home.module.scss'
import classnames from 'classnames'
import { Header } from '@/components/business/Header/Header'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Footer } from '@/components/business/Footer/Footer'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { APP_ROUTES } from '@/models/routes'
import Img1 from '@/assets/home/img-1.jpg'
import Img2 from '@/assets/home/img-2.jpg'
import Img3 from '@/assets/home/img-3.jpg'
import Look1 from '@/assets/collections/look_1.jpg'
import Look2 from '@/assets/collections/look_2.jpg'
import Look3 from '@/assets/collections/look_3.jpg'
import Look4 from '@/assets/collections/look_4.jpg'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const CATEGORIES = [
  { name: 'КАБЛУЧКИ', slug: 'rings', img: Look1 },
  { name: 'НАМИСТО', slug: 'necklaces', img: Look2 },
  { name: 'БРАСЛЕТИ', slug: 'bracelets', img: Look3 },
  { name: 'СЕРЕЖКИ', slug: 'earrings', img: Look4 },
]

const STATS = [
  { value: '585° та 750°', label: 'ЗОЛОТО ВИЩОЇ ПРОБИ' },
  { value: 'РУЧНА РОБОТА', label: 'АВТОРСЬКИЙ ПІДХІД' },
  { value: 'КИЇВ', label: 'ВИРОБЛЕНО В УКРАЇНІ' },
]

interface HomeProps {
  className?: string
}

const Home: FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <>
      <PageMeta
        title="Ювелірні прикраси"
        description="Авторські ювелірні прикраси з золота та срібла від українського бренду Way. Каблучки, намисто, браслети, сережки."
      />
      <div className={classnames(cls.home, 'flex-grow', [className])}>
        <div className={cls.info}>
          <Header />
          <main className={'flex-container container'}>
            <Sidebar className=" col-1" />
          </main>
          <h1 className={cls.title}>Way</h1>
          <div className={cls.heroContent}>
            <h2 className={cls.heroCtaTitle}>ВАША НАСТУПНА ПРИКРАСА</h2>
            <p className={cls.heroCtaSubtitle}>ВІДКРИЙТЕ ПОВНУ КОЛЕКЦІЮ</p>
            <button className={cls.heroButton} onClick={() => navigate(APP_ROUTES.STORE)}>
              ПЕРЕГЛЯНУТИ КОЛЕКЦІЇ
            </button>
          </div>
          <div className={cls.heroStats}>
            <div className="container">
              <div className={cls.heroStatsGrid}>
                {STATS.map(({ value, label }) => (
                  <div key={label} className={cls.heroStat}>
                    <span className={cls.heroStatValue}>{value}</span>
                    <span className={cls.heroStatLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={cls.gallery}>
          <div>
            <img src={Img1} alt={'collection'} />
          </div>
          <div>
            <img src={Img2} alt={'collection'} loading="lazy" />
          </div>
          <div>
            <img src={Img3} alt={'collection'} loading="lazy" />
          </div>
        </div>

        <section className={cls.categoriesSection}>
          <div className="container">
            <Typography variant="h2" type={TypographyTypes.HEADER} className={cls.sectionTitle}>
              КОЛЕКЦІЇ
            </Typography>
            <div className={cls.categoryGrid}>
              {CATEGORIES.map(({ name, slug, img }) => (
                <button
                  key={slug}
                  type="button"
                  className={cls.categoryCard}
                  onClick={() => navigate(APP_ROUTES.STORE_WITH_PRODUCT(slug))}
                >
                  <img src={img} alt={name} loading="lazy" />
                  <div className={cls.overlay}>
                    <span className={cls.categoryName}>{name}</span>
                    <span className={cls.categoryArrow}>Дивитись →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Home
