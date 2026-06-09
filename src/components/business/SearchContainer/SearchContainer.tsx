import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import cls from './SearchContainer.module.scss'
import classnames from 'classnames'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar'
import { SearchDropdown } from '@/components/ui/SearchDropdown/SearchDropdown'
import { useSearchProducts } from '@/hooks/useSearchProducts'

interface SearchContainerProps {
  className?: string
}

export const SearchContainer: FC<SearchContainerProps> = ({ className }) => {
  const navigateTo = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { results, loading } = useSearchProducts(query)

  useEffect(() => {
    setQuery(searchParams.get('search') ?? '')
  }, [searchParams])

  useEffect(() => {
    setIsOpen(query.trim().length >= 2)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = useCallback(
    (q: string) => {
      setIsOpen(false)
      navigateTo(q.trim() ? `/store?search=${encodeURIComponent(q.trim())}` : '/store')
    },
    [navigateTo]
  )

  const handleSelect = useCallback(() => setIsOpen(false), [])

  return (
    <div ref={wrapperRef} className={classnames(cls.wrapper, [className])}>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      {isOpen && (
        <SearchDropdown results={results} loading={loading} onSelect={handleSelect} />
      )}
    </div>
  )
}
