import { type FC, ReactNode, useRef, useState } from 'react'
import cls from './Accordion.module.scss'
import Plus from '@/assets/general/plus.svg'
import Arrow from '@/assets/general/arrow.svg'
import classnames from 'classnames'

export enum AccordionType {
  ARROW = 'accordion-arrow',
  REGULAR = 'accordion-regular',
}
interface IAccordionItems {
  id: string
  title: string
  content: string | ReactNode
  type?: AccordionType
}

interface AccordionProps {
  className?: string
  items: IAccordionItems[]
  type?: AccordionType
}

const AccordionItem: FC<IAccordionItems> = ({
  id,
  title,
  content,
  type = AccordionType.REGULAR,
}) => {
  const [isOpened, setOpened] = useState(false)
  const ref = useRef<HTMLParagraphElement | null>(null)

  const onClick = () => setOpened(prev => !prev)

  return (
    <li className={classnames(cls.item, { [cls.opened]: isOpened })} key={id}>
      {type === AccordionType.REGULAR && (
        <button className={cls.control} onClick={onClick} aria-expanded={!isOpened}>
          <span>{title}</span>
          <span className={cls.icon}>
            <Plus className={cls.plus} />
            <span className={cls.minus} />
          </span>
        </button>
      )}

      {type === AccordionType.ARROW && (
        <button className={cls.control} onClick={onClick} aria-expanded={!isOpened}>
          <span>{title}</span>
          <span className={cls.icon}>
            <Arrow className={cls.arrow} />
          </span>
        </button>
      )}

      <div
        className={cls.content}
        aria-hidden={isOpened}
        ref={ref}
        style={{ maxHeight: isOpened ? ref.current?.scrollHeight : 0 }}
      >
        <div>{content}</div>
      </div>
    </li>
  )
}

export const Accordion: FC<AccordionProps> = ({
  items,
  className,
  type = AccordionType.REGULAR,
}) => {
  return (
    <ul className={classnames(cls.accordion, [className], cls[type])}>
      {items?.map(item => (
        <AccordionItem {...item} key={item.id} type={type as AccordionType} />
      ))}
    </ul>
  )
}
