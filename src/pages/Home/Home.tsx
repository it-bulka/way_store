import { type FC } from 'react'
import cls from './Home.module.scss'
import classnames from 'classnames'
import { Header } from '@/components/business/Header/Header'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Footer } from '@/components/business/Footer/Footer'
import Img1 from '@/assets/home/img-1.jpg'
import Img2 from '@/assets/home/img-2.jpg'
import Img3 from '@/assets/home/img-3.jpg'

interface HomeProps {
  className?: string
}
const Home: FC<HomeProps> = ({ className }) => {
  return (
    <>
      <div className={classnames(cls.home, 'flex-grow', [className])}>
        <div className={cls.info}>
          <Header />
          <main className={'flex-container container'}>
            <Sidebar className=" col-1" />
          </main>
          <h1 className={cls.title}>Way</h1>
        </div>
        <div className={cls.gallery}>
          <div>
            <img src={Img1} alt={'collection'} />
          </div>
          <div>
            <img src={Img2} alt={'collection'} />
          </div>
          <div>
            <img src={Img3} alt={'collection'} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
