import dayjs from 'dayjs'

export const daysInMonth = (year: number, month: number) => {
  const startDate = dayjs().year(year).month(month).date(1)
  const endDate = startDate.endOf('month')
  const days = []

  for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'day')) {
    days.push(date.date())
  }

  return days.map(day => {
    const dayString = day.toString()
    return { id: dayString, label: dayString, value: day }
  })
}
export const monthsOfYear = () => {
  const months = []

  for (let month = 0; month < 12; month++) {
    months.push({
      id: month.toString(),
      label: dayjs().month(month).format('MMMM'),
      value: month,
    })
  }

  console.log('months', months)
  return months
}

const getYears = (startYear: number, endYear: number) => {
  const years = []

  for (let year = startYear; year >= endYear; year--) {
    const yearString = year.toString()
    years.push({
      id: yearString,
      label: yearString,
      value: year,
    })
  }

  return years
}

export const days = daysInMonth(2023, 6)
export const months = monthsOfYear()
export const currentYear = new Date().getFullYear()
export const years = getYears(currentYear, currentYear - 100)
