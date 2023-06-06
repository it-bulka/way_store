import { type FC, useEffect, useState, useId } from 'react'
import cls from './Dropdown.module.scss'
import Arrow from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'

interface SelectProps {
  className?: string
  title: string
  options: string[]
}

export const Dropdown: FC<SelectProps> = ({ className = '', title, options }) => {
  const [opened, setOpened] = useToggle(false)
  const [chosenOptions] = useState([1, 2])
  const id = useId()

  useEffect(() => {
    const clickHandle = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest('#dropdown-' + id)) {
        setOpened(false)
      }
    }

    document.addEventListener('click', clickHandle)
    return () => document.removeEventListener('click', clickHandle)
  }, [setOpened, id])

  return (
    <div className={`${cls.dropdown} ${className} ${opened && cls.opened}`} id={'dropdown-' + id}>
      <button className={cls.title} onClick={() => setOpened()} aria-label="label">
        <span>
          {title} {options.length ? `(${chosenOptions.length})` : null}
        </span>
        <span className={cls.arrow}>
          <Arrow />
        </span>
      </button>

      {opened && (
        <ul className={cls.content}>
          {options?.map(item => (
            <li key={item} className={cls.container}>
              <Checkbox label={item} value={item} key={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
