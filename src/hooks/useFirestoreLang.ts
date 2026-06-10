import { useTranslation } from 'react-i18next'
import type { AppLocale, FirestoreLang } from '@/models/pages'
import { LOCALE_TO_FIRESTORE_LANG } from '@/models/pages'

export function useFirestoreLang(): FirestoreLang {
  const { i18n } = useTranslation()
  const locale = i18n.language.split('-')[0] as AppLocale
  return LOCALE_TO_FIRESTORE_LANG[locale] ?? 'ukr'
}
