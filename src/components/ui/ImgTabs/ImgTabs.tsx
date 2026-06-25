import {
  type FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import cls from './ImgTabs.module.scss'
import { handleImgError } from '@/utils/imageFallback'

interface ImgTabsProps {
  options: string[]
  alt?: string
}
export const ImgTabs: FC<ImgTabsProps> = ({ options, alt = '' }) => {
  const [shownImg, setShownImg] = useState<string>(options[0])
  const [tabs, setTabs] = useState<string[]>(options.slice(1))

  const onTabClick = useCallback(
    (src: string): MouseEventHandler | KeyboardEventHandler => {
      return () => {
        setShownImg(src)
        const newTabs = options.filter(item => item !== src)
        setTabs(newTabs)
      }
    },
    [options]
  )

  useEffect(() => {
    setShownImg(options[0])
    setTabs(options.slice(1))
  }, [options])

  return (
    <div className={cls.imgTabs}>
      <div className={cls.viewer}>
        <img
          src={shownImg}
          alt={alt}
          onError={handleImgError}
        />
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
            <img
              src={imgSrc}
              alt={alt}
              loading="lazy"
              onError={e => {
                const el = e.currentTarget as HTMLImageElement
                el.onerror = null
                el.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3C/svg%3E"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
