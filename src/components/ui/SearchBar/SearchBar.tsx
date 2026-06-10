import { type FC, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('common')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(value)
  }

  return (
    <div className={classnames(cls.searchBar, [className])}>
      <button
        type="button"
        className={cls.searchBtn}
        onClick={() => onSearch(value)}
        aria-label={t('search.ariaSearch')}
      >
        <Search />
      </button>
      <input
        type="text"
        aria-label="search"
        placeholder={t('search.placeholder')}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          type="button"
          className={cls.clearBtn}
          onClick={() => onChange('')}
          aria-label={t('search.ariaClear')}
        >
          ×
        </button>
      )}
    </div>
  )
}
