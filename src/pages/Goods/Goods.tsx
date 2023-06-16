import { PrevNextBtns } from '@/components/ui/PrevNextBtns/PrevNextBtns'
import { ImgTabs } from '@/components/ui/ImgTabs/ImgTabs'
import cls from './Goods.module.scss'

import Ring1 from '@/assets/goods/Ring 1.jpg'
import Ring2 from '@/assets/goods/Ring 2.jpg'
import Ring3 from '@/assets/goods/Ring 3.jpg'
import Ring4 from '@/assets/goods/Ring 4.jpg'
import { Button } from '@/components/ui/Button/Button'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { ColorPicker } from '@/components/ui/ColorPicker/ColorPicker'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import LikeIcon from '@/assets/general/heart.svg'

const rings = [Ring1, Ring2, Ring3, Ring4]
const colors = [
  { id: '1', color: '#D3D3D3' },
  { id: '2', color: '#C0BA97' },
  { id: '3', color: '#DBC5C5' },
]

const accordionItems = [
  {
    id: '1',
    title: 'Детали',
    content: 'OremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOrem',
  },
  {
    id: '2',
    title: 'Руководство по размеру',
    content:
      'LOrem LOrem LOremvvLOr emLOremL OremLOremLOrem LOr emLOremLOremLO remLOre mLOremLOrem LOremLOr emvvLOremLOrem LOremLOremLOLOremLOrem LOremLOremvvLOremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOrem',
  },
  {
    id: '3',
    title: 'Уход за продуктом',
    content:
      'LOrem LOremLOremvvLOremLOrem LOremLOremLOremLOremLOremLOr emLOremL OremLOremLOrem LOremLOr emvvLOremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOrem LOremLOremvvLOremLOremLOremLOremLOremLOremLOemLOremLOremLOremLOremLOremLOremLOremLOrem',
  },
  {
    id: '4',
    title: 'Доставка и возврат',
    content:
      'emLOremLOremLOrem LOremLOremLOremLOremLOremLOrem LOremLOr emvvLOrem LOremLOremLOremLOremLOremLO remLOremLOremLOremLOrem',
  },
]

const Goods = () => {
  return (
    <div className={cls.goods}>
      <BreadCrumbs />
      <div className={cls.title}>
        <Typography type={TypographyTypes.HEADER} variant="h3">
          Кольца
        </Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <PrevNextBtns onNextClick={() => {}} onPrevClick={() => {}} />
      </div>
      <div className={cls.content}>
        <div className={cls.col1}>
          <ImgTabs options={rings} />
        </div>
        <div className={cls.col2}>
          <div className={cls.descript}>
            {/*TODO: make dynamic */}
            <Typography>SILVER ECHMIA EAR CUFF (SINGLE - BOTH EARS)</Typography>
            <button>
              <LikeIcon />
            </button>
          </div>
          {/*TODO: make dynamic */}
          <Typography type={TypographyTypes.HEADER} variant="h4">
            £245.00
          </Typography>

          <div className={cls.controls}>
            <div className={cls.stepper}>
              <Typography>Кол-во</Typography>
              <Stepper />
            </div>
            <div className={cls.btns}>
              <Button title={'Добавить в корзину'} />
              <Button title={'Купить'} />
            </div>
          </div>
          <ColorPicker options={colors} title={'Metal'} />
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  )
}

export default Goods
