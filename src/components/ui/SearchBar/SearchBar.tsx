import { type FC } from 'react'
import cls from './SearchBar.module.scss'
import Search from '@/assets/general/search.svg'
import classnames from 'classnames'

interface SearchBarProps {
  className?: string
}
export const SearchBar: FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={classnames(cls.searchBar, [className])}>
      <span>
        <Search />
      </span>
      <input type="text" aria-label="search" placeholder="Найти..." />
    </div>
  )
}
