import cls from './Collection.module.scss'
import classnames from 'classnames'
import { Header } from '@/components/business/Header/Header'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Footer } from '@/components/business/Footer/Footer'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/models'

interface GalleryItem {
  id: string
  img: string
  alt: string
  productId?: string
  productCategory?: string
}

interface CollectionProps {
  className?: string
  title: string
  info: string
  gallery: GalleryItem[]
  heroImage?: string
}
const Collection = ({ className, title, info, gallery, heroImage }: CollectionProps) => {
  const navigate = useNavigate()
  return (
    <div className={classnames(cls.collection, {}, [className])}>
      <PageMeta title={title} description={info.slice(0, 160)} ogImage={gallery[0]?.img} />
      <div
        className={cls.firstBlock}
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <Header />
        <div className={'flex-container container'}>
          <Sidebar />
        </div>
      </div>
      <main>
        <section className={classnames(cls.container, cls.content)}>
          <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.title}>
            {title}
          </Typography>
          <Typography className={cls.text}>{info}</Typography>
        </section>

        <section className={cls.gallery}>
          {gallery.map(({ img, alt, id, productId, productCategory }) =>
            productId ? (
              <button
                key={id}
                type="button"
                className={cls.clickable}
                onClick={() => navigate(APP_ROUTES.GOODS_DETAIL(productId, productCategory))}
              >
                <img src={img} alt={alt} loading="lazy" />
              </button>
            ) : (
              <div key={id}>
                <img src={img} alt={alt} loading="lazy" />
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Collection
