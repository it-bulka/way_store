export const FAQ_NAV_PATHS = [
  { id: '1', path: 'questions' },
  { id: '2', path: 'delivery' },
  { id: '3', path: 'payment' },
  { id: '4', path: 'contacts' },
] as const

export type FaqNavPath = (typeof FAQ_NAV_PATHS)[number]['path']
