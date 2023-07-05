import { useEffect, useState } from 'react'
import cls from './Dropdown.module.scss'
import Arrow from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import classnames from 'classnames'

export interface IOption<T extends string> {
  label: T
  id: string
  chosen: boolean
}
interface SelectProps<T extends string> {
  className?: string
  title: string
  options: IOption<T>[]
  onChangeChecked?: (optionId: string, status: boolean) => void
}

export const Dropdown = <T extends string>({
  className,
  title,
  options,
  onChangeChecked,
}: SelectProps<T>) => {
  const [opened, setOpened] = useToggle(false)
  const [chosenAmount, setChosenAmount] = useState(0)

  useEffect(() => {
    const clickHandle = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest('.drop')) {
        setOpened(false)
      }
    }

    document.addEventListener('click', clickHandle)
    return () => document.removeEventListener('click', clickHandle)
  }, [setOpened])

  const checkChosen = () => {
    const amount = options.filter(item => item.chosen).length
    setChosenAmount(amount)
  }

  const onCheck = (optionId: string, status: boolean) => onChangeChecked?.(optionId, status)

  useEffect(() => {
    checkChosen()
  }, [options, checkChosen])

  return (
    <div className={classnames(cls.dropdown, [className, 'drop'], { [cls.opened]: opened })}>
      <button className={cls.title} onClick={() => setOpened()} aria-label="label">
        <span>
          {title} {chosenAmount ? `(${chosenAmount})` : null}
        </span>
        <span className={cls.arrow}>
          <Arrow />
        </span>
      </button>

      {opened && (
        <ul className={cls.content}>
          {options?.map(item => (
            <li key={item.id} className={cls.container}>
              <Checkbox
                label={item.label}
                checked={item.chosen}
                onChecked={status => onCheck(item.id, status)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
