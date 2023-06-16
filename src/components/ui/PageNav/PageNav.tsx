import { MouseEvent, useState, useRef, useEffect, useCallback, FC } from 'react'
import cls from './PageNav.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'

interface PageNavProps {
  options: { id: string; title: string; path: string }[]
}

export const PageNav: FC<PageNavProps> = ({ options }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, transform: 'translateX(0)' })
  const [positionShift, setPositionShift] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  //TODO: make responsive to changing screens
  const getStartPosition = useCallback((elem: HTMLElement): number => {
    return elem.getBoundingClientRect().left
  }, [])

  const setUnderLine = useCallback((elem: HTMLElement, shift: number) => {
    const linkWidth = elem.offsetWidth
    const linkPosition = elem.getBoundingClientRect().left
    setUnderlineStyle({
      width: linkWidth,
      transform: `translateX(${linkPosition - shift}px)`,
    })
  }, [])

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setUnderLine(e.target as HTMLElement, positionShift)
  }

  useEffect(() => {
    const wrapper = ref.current
    if (wrapper) {
      const wrapperStartPosition = getStartPosition(wrapper as HTMLElement)
      setPositionShift(wrapperStartPosition)
      const activeLink = wrapper.querySelector('li.active') as HTMLElement | null
      activeLink && setUnderLine(activeLink, wrapperStartPosition)
    }
  }, [getStartPosition, setUnderLine])

  return (
    <nav className={cls.pageNav} ref={ref}>
      <ul>
        {options.map(({ id, title, path }) => (
          <AppLink
            title={title}
            key={id}
            withDecoration={false}
            onClick={handleLinkClick}
            className={'active'}
            path={path}
          />
        ))}
      </ul>
      <div className={cls.underline} style={underlineStyle}></div>
    </nav>
  )
}
