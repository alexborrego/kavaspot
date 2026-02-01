// Day of week constants
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const formatTime = (time: string | null): string => {
  if (!time) return 'TBD'
  return time.slice(0, 5) // HH:MM format
}

export const getDayName = (dayIndex: number): string => {
  return DAYS_OF_WEEK[dayIndex] || 'TBD'
}

export const getCurrentDay = (): number => {
  return new Date().getDay()
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
