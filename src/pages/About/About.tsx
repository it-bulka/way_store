import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import cls from './About.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Info } from '@/components/ui/Info/Info'
import { Button } from '@/components/ui/Button/Button'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import Img1 from '@/assets/home/img-1.jpg'
import Img2 from '@/assets/home/img-2.jpg'
import Img3 from '@/assets/home/img-3.jpg'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const VALUE_KEYS = ['craftsmanship', 'materials', 'eternity'] as const

const About = () => {
  const { t } = useTranslation('about')
  const navigate = useNavigate()

  return (
    <div className={cls.about}>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <BreadCrumbs />

      <section className={cls.hero}>
        <div className={cls.heroText}>
          <h1 className={cls.heroTitle}>WAY</h1>
          <Typography className={cls.heroTagline}>{t('hero.tagline')}</Typography>
        </div>
        <div className={cls.heroImage}>
          <img src={Img3} alt={t('hero.imgAlt')} loading="lazy" />
        </div>
      </section>

      <section className={cls.story}>
        <Typography variant="h2" type={TypographyTypes.HEADER}>
          {t('story.title')}
        </Typography>
        <div className={cls.storyContent}>
          <div className={cls.storyText}>
            <Typography>{t('story.p1')}</Typography>
            <Typography>{t('story.p2')}</Typography>
          </div>
          <img src={Img1} alt={t('story.imgAlt')} className={cls.storyImage} loading="lazy" />
        </div>
      </section>

      <section className={cls.values}>
        {VALUE_KEYS.map(key => (
          <Info
            key={key}
            title={t(`values.${key}.title`)}
            content={t(`values.${key}.content`)}
            className={cls.value}
          />
        ))}
      </section>

      <blockquote className={cls.quote}>
        <Typography className={cls.quoteText}>{t('quote')}</Typography>
      </blockquote>

      <section className={cls.atelier}>
        <img src={Img2} alt={t('atelier.imgAlt')} className={cls.atelierImage} loading="lazy" />
        <div className={cls.atelierText}>
          <Typography variant="h2" type={TypographyTypes.HEADER}>
            {t('atelier.title')}
          </Typography>
          <Typography>{t('atelier.content')}</Typography>
        </div>
      </section>

      <section className={cls.cta}>
        <Button title={t('cta')} onClick={() => navigate('/store')} />
      </section>
    </div>
  )
}

export default About
