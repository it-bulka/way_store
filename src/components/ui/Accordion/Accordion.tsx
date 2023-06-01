import { type FC, useRef, useState } from 'react'
import cls from './Accordion.module.scss'
import Plus from '@/assets/general/plus.svg'

interface IAccordionItems {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: IAccordionItems[]
}

const AccordionItem: FC<IAccordionItems> = ({ id, title, content }) => {
  const [isOpened, setOpened] = useState(false)
  const ref = useRef<HTMLParagraphElement | null>(null)

  const onClick = () => setOpened(prev => !prev)

  return (
    <li className={cls.item + ' ' + (isOpened && cls.opened)} key={id}>
      <button className={cls.control} onClick={onClick} aria-expanded={!isOpened}>
        <span>{title}</span>
        <span className={cls.icon}>
          <Plus className={cls.plus} />
          <span className={cls.minus} />
        </span>
      </button>
      <p
        className={cls.content}
        aria-hidden={isOpened}
        ref={ref}
        style={{ maxHeight: isOpened ? ref.current?.scrollHeight : 0 }}
      >
        {content}
      </p>
    </li>
  )
}

export const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <ul className={cls.accordion}>
      {items?.map(item => (
        <AccordionItem {...item} key={item.id} />
      ))}
    </ul>
  )
}
