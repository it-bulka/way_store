import { type FC, useEffect, useState } from 'react'
import cls from './Dropdown.module.scss'
import Arrow from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'

interface SelectProps {
  className?: string
  title: string
  options: string[]
}

export const Dropdown: FC<SelectProps> = ({ className = '', title, options }) => {
  const [opened, setOpened] = useToggle(false)
  const [chosenOptions, setChosenOptions] = useState([1, 2])

  useEffect(() => {
    const clickHandle = e => {
      if (!e.target.closest('#dropdown-' + title)) {
        setOpened(false)
      }
    }

    document.addEventListener('click', clickHandle)
    return () => document.removeEventListener('click', clickHandle)
  }, [])

  return (
    <div
      className={`${cls.dropdown} ${className} ${opened && cls.opened}`}
      id={'dropdown-' + title}
    >
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
              <label>
                <input type="checkbox" />
                <span className={cls.checkmark}></span>
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
