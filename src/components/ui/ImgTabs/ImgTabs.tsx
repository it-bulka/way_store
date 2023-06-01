import { type FC, KeyboardEventHandler, MouseEventHandler, useState } from 'react'
import cls from './ImgTabs.module.scss'

interface ImgTabsProps {
  options: string[]
}
export const ImgTabs: FC<ImgTabsProps> = ({ options }) => {
  const [shownImg, setShownImg] = useState<string>(options[0])
  const [tabs, setTabs] = useState<string[]>(options.slice(1))

  const onTabClick = (src: string): MouseEventHandler | KeyboardEventHandler => {
    return () => {
      setShownImg(src)
      const newTabs = options.filter(item => item !== src)
      setTabs(newTabs)
    }
  }

  return (
    <div className={cls.imgTabs}>
      <div className={cls.viewer}>
        <img src={shownImg} alt={'ring'} />
      </div>

      <div className={cls.container}>
        {tabs?.map((imgSrc, order) => (
          <div
            role="button"
            onClick={onTabClick(imgSrc) as MouseEventHandler}
            onKeyDown={onTabClick(imgSrc) as KeyboardEventHandler}
            tabIndex={order}
            key={imgSrc}
            className={cls.tab}
          >
            <img src={imgSrc} alt={'ring'} />
          </div>
        ))}
      </div>
    </div>
  )
}
