import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
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

const STAT_KEYS = ['gold', 'handmade', 'kyiv'] as const

const CATEGORIES = [
  { key: 'rings', img: Look1 },
  { key: 'necklaces', img: Look2 },
  { key: 'bracelets', img: Look3 },
  { key: 'earrings', img: Look4 },
] as const

interface HomeProps {
  className?: string
}

const Home: FC<HomeProps> = ({ className }) => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()

  return (
    <>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <div className={classnames(cls.home, 'flex-grow', [className])}>
        <div className={cls.info}>
          <Header />
          <main className={'flex-container container'}>
            <Sidebar className=" col-1" />
          </main>
          <h1 className={`${cls.title} notranslate`} translate="no">Way</h1>
          <div className={cls.heroContent}>
            <h2 className={cls.heroCtaTitle}>{t('hero.cta')}</h2>
            <p className={cls.heroCtaSubtitle}>{t('hero.subtitle')}</p>
            <button className={cls.heroButton} onClick={() => navigate(APP_ROUTES.STORE)}>
              {t('hero.button')}
            </button>
          </div>
          <div className={cls.heroStats}>
            <div className="container">
              <div className={cls.heroStatsGrid}>
                {STAT_KEYS.map(key => (
                  <div key={key} className={cls.heroStat}>
                    <span className={cls.heroStatValue}>{t(`stats.${key}.value`)}</span>
                    <span className={cls.heroStatLabel}>{t(`stats.${key}.label`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={cls.gallery}>
          <div>
            <img src={Img1} alt={t('gallery.altText')} />
          </div>
          <div>
            <img src={Img2} alt={t('gallery.altText')} loading="lazy" />
          </div>
          <div>
            <img src={Img3} alt={t('gallery.altText')} loading="lazy" />
          </div>
        </div>

        <section className={cls.categoriesSection}>
          <div className="container">
            <Typography variant="h2" type={TypographyTypes.HEADER} className={cls.sectionTitle}>
              {t('collections.title')}
            </Typography>
            <div className={cls.categoryGrid}>
              {CATEGORIES.map(({ key, img }) => {
                const name = t(`collections.categories.${key}`)
                return (
                  <button
                    key={key}
                    type="button"
                    className={cls.categoryCard}
                    onClick={() => navigate(APP_ROUTES.STORE_WITH_PRODUCT(key))}
                  >
                    <img src={img} alt={name} loading="lazy" />
                    <div className={cls.overlay}>
                      <span className={cls.categoryName}>{name}</span>
                      <span className={cls.categoryArrow}>{t('collections.viewMore')}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Home
