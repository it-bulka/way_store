import { type FC } from 'react'
import cls from './FAQ.module.scss'
import { Accordion, AccordionType } from '@/components/ui/Accordion/Accordion'
import { FAQdata } from '@/data/FAQdata'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Info } from '@/components/ui/Info/Info'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { Outlet } from 'react-router-dom'

interface FAQProps {
  className?: string
}
const options = [
  { id: '1', title: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ', path: 'faq' },
  { id: '2', title: 'ДОСТАВКА', path: 'delivery' },
  { id: '3', title: 'ОПЛАТА', path: 'payment' },
  { id: '4', title: 'СВЯЗАТЬСЯ С НАМИ', path: 'contact' },
]
const deliveryInfo = [
  {
    id: '1',
    title: 'Самовывоз из пункта выдачи СДЕК',
    content: `Доставка по России осуществляется логистической службой СДЕК. Срок и стоимость доставки рассчитывается при добавлении изделия в корзину и зависит от веса изделия и его стоимости.`,
  },
  {
    id: '2',
    title: 'Курьерская доставка',
    content: `При оформлении заказа вы можете выбрать доставку курьером на дом. Возможность доставки, срок и стоимость зависят от города получения заказа, все сведения отображаются в корзине. В день доставки с Вами свяжется представитель транспортной компании и напомнит о предстоящей доставке.`,
  },
]

export const Questions = () => {
  return (
    <>
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
      </Typography>
      <Accordion items={FAQdata} type={AccordionType.ARROW} />
    </>
  )
}

export const Delivery = () => {
  return (
    <>
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        ДОСТАВКА
      </Typography>
      {deliveryInfo.map(({ title, content, id }) => (
        <Info title={title} content={content} key={id} />
      ))}
    </>
  )
}

export const Payment = () => {
  return (
    <>
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        Оплата
      </Typography>
      <Info
        title={'Оплата онлайн'}
        content={`Оплата происходит через авторизационный сервер Процессингового центра Сбербанка с использованием Банковских кредитных карт следующих платежных систем:\\n
– VISA International\\n
– MasterCard World Wide`}
      />
    </>
  )
}

export const Contacts = () => {
  return (
    <>
      <Typography className={cls.title} type={TypographyTypes.HEADER} variant="h3">
        СВЯЗАТЬСЯ С НАМИ
      </Typography>

      <div className={cls.info}>
        <Typography>
          Если у вас возникнут вопросы по поводу вашего заказа, продукта или чего-либо еще, напишите
          нам, заполнив форму запроса ниже.
        </Typography>
        <Typography>
          По вопросам оптовой торговли обращайтесь по адресу{' '}
          <a href="mailto:sales@sweetlimejuice.com">sales@sweetlimejuice.com.</a>
        </Typography>
        <Typography>
          Для прессы обращайтесь по адресу{' '}
          <a href="mailto:press@sweetlimejuice.com">press@sweetlimejuice.com</a>
        </Typography>
      </div>

      <ContactForm />
    </>
  )
}

const Faq: FC<FAQProps> = ({ className = '' }) => {
  return (
    <div className={cls.FAQ + ' ' + className}>
      <PageNav options={options} />
      <Outlet />
    </div>
  )
}

export default Faq
