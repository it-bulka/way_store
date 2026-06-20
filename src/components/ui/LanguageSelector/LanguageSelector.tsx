import { type FC, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import type { AppLocale } from '@/models/pages'
import cls from './LanguageSelector.module.scss'

const LANGUAGES: { code: AppLocale; label: string }[] = [
  { code: 'uk', label: 'УКР' },
  { code: 'en', label: 'ENG' },
  { code: 'pl', label: 'POL' },
]

interface LanguageSelectorProps {
  className?: string
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ className }) => {
  const { i18n } = useTranslation()
  const current = i18n.language as AppLocale
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onOutsideClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [isOpen])

  const currentLabel = LANGUAGES.find(l => l.code === current)?.label ?? 'УКР'
  const others = LANGUAGES.filter(l => l.code !== current)

  const handleSelect = (code: AppLocale) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className={classnames(cls.root, { [cls.open]: isOpen }, [className])} ref={rootRef}>
      <button
        type="button"
        className={cls.trigger}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLabel}
        <span className={cls.chevron} aria-hidden="true" />
      </button>

      <ul className={cls.dropdown} role="listbox" aria-label="language">
        {others.map(({ code, label }) => (
          <li key={code} role="option" aria-selected={false}>
            <button type="button" className={cls.option} onClick={() => handleSelect(code)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
