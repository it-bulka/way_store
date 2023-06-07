export const formatDate = (date: Date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const
  const formatter = new Intl.DateTimeFormat('en', options).format(date)

  return formatter.split('/').join('.')
}
