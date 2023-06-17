export const formatNumberIntoGroups = (num: number, numInGroup = 3): string => {
  const pattern = new RegExp(`(\\d)(?=(\\d{${numInGroup}})+$)`, 'g')

  return String(num).replace(pattern, '$1 ')
}
