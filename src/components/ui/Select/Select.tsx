import { type FC, useState } from 'react'
import cls from './Select.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'

interface SelectProps {
  className?: string
  initialValue?: string
  onChose?: <T>(chosen: T) => void
}

const options = ['пн', 'вт', 'ср', 'чт', 'сб', 'нд']
export const Select: FC<SelectProps> = ({ className = '', initialValue = 'День', onChose }) => {
  const [chosen, setChosen] = useState<string | null>(null)
  const [isOpen, setOpen] = useToggle(false)

  const onItemClick = (item: string) => {
    setChosen(item)
    onChose && onChose(item)
  }

  return (
    <div className={cls.select + ' ' + className + ' ' + (isOpen && cls.opened)}>
      <p>{chosen || initialValue}</p>
      <button onClick={() => setOpen()}>
        <ArrowIcon />
      </button>
      {isOpen && (
        <ul className={cls.options}>
          {options.map(item => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li onClick={() => onItemClick(item)} onKeyDown={() => onItemClick(item)} key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
