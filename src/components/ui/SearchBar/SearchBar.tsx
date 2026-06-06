import { type FC, type KeyboardEvent } from 'react'
import cls from './SearchBar.module.scss'
import Search from '@/assets/general/search.svg'
import classnames from 'classnames'

interface SearchBarProps {
  className?: string
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ className, value, onChange, onSearch }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(value)
  }

  return (
    <div className={classnames(cls.searchBar, [className])}>
      <button
        type="button"
        className={cls.searchBtn}
        onClick={() => onSearch(value)}
        aria-label="Пошук"
      >
        <Search />
      </button>
      <input
        type="text"
        aria-label="search"
        placeholder="Пошук..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          type="button"
          className={cls.clearBtn}
          onClick={() => {
            onChange('')
            onSearch('')
          }}
          aria-label="Скинути пошук"
        >
          ×
        </button>
      )}
    </div>
  )
}
