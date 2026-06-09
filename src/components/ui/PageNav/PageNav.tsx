import { MouseEvent, useState, useRef, useEffect, useCallback, FC } from 'react'
import { useLocation } from 'react-router-dom'
import cls from './PageNav.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'

interface PageNavProps {
  options: { id: string; title: string; path: string }[]
}

export const PageNav: FC<PageNavProps> = ({ options }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, transform: 'translateX(0)' })
  const [positionShift, setPositionShift] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  const { pathname } = useLocation()

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
    if (!wrapper) return
    const wrapperStartPosition = getStartPosition(wrapper as HTMLElement)
    setPositionShift(wrapperStartPosition)
    const activeIndex = options.findIndex(opt => pathname.includes(opt.path))
    const items = wrapper.querySelectorAll('li')
    const activeItem = items[activeIndex] as HTMLElement | undefined
    activeItem && setUnderLine(activeItem, wrapperStartPosition)
  }, [getStartPosition, setUnderLine, pathname, options])

  return (
    <nav className={cls.pageNav} ref={ref}>
      <ul>
        {options.map(({ id, title, path }) => (
          <AppLink
            title={title}
            key={id}
            withDecoration={false}
            onClick={handleLinkClick}
            isActive={pathname.includes(path)}
            path={path}
          />
        ))}
      </ul>
      <div className={cls.underline} style={underlineStyle}></div>
    </nav>
  )
}
