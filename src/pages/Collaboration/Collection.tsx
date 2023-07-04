//import { type FC } from 'react'
import cls from './Collection.module.scss'
import classnames from 'classnames'
import { Header } from '@/components/business/Header/Header'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
//import { ProductsList } from '@/components/business/ProductsList/ProductsList'
//import { products } from '@/data/products'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Footer } from '@/components/business/Footer/Footer'

interface CollectionProps {
  className?: string
  title: string
  info: string
  gallery: { img: string; alt: string; id: string }[]
}
const Collection = ({ className, title, info, gallery }: CollectionProps) => {
  return (
    <div className={classnames(cls.collection, {}, [className])}>
      <div className={cls.firstBlock}>
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

          {/*<ProductsList products={products} />*/}
        </section>

        <section className={cls.gallery}>
          {gallery.map(({ img, alt, id }) => (
            <div key={id}>
              <img src={img} alt={alt} />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Collection
