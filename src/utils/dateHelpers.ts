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

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date.toDateString() === tomorrow.toDateString()
}

export const isThisWeek = (date: Date): boolean => {
  const today = new Date()
  const weekFromNow = new Date()
  weekFromNow.setDate(weekFromNow.getDate() + 7)
  return date >= today && date <= weekFromNow
}

export const getEventDateTime = (event: { event_date?: string | null; start_time?: string | null }): Date | null => {
  if (!event.event_date && !event.start_time) return null

  const now = new Date()
  const baseDate = event.event_date ? new Date(event.event_date) : now

  if (event.start_time) {
    const [hours, minutes] = event.start_time.split(':').map(Number)
    baseDate.setHours(hours, minutes, 0, 0)
  }

  return baseDate
}

export const isHappeningNow = (event: { event_date?: string | null; start_time?: string | null; end_time?: string | null }): boolean => {
  const now = new Date()
  const startDateTime = getEventDateTime(event)

  if (!startDateTime) return false

  let endDateTime = new Date(startDateTime)
  if (event.end_time) {
    const [hours, minutes] = event.end_time.split(':').map(Number)
    endDateTime.setHours(hours, minutes, 0, 0)
  } else {
    endDateTime.setHours(23, 59, 59, 999)
  }

  return now >= startDateTime && now <= endDateTime
}

export const isStartingSoon = (event: { event_date?: string | null; start_time?: string | null }): boolean => {
  const now = new Date()
  const startDateTime = getEventDateTime(event)

  if (!startDateTime) return false

  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000)
  return startDateTime > now && startDateTime <= twoHoursFromNow
}

export const getTimeUntil = (event: { event_date?: string | null; start_time?: string | null }): string => {
  const startDateTime = getEventDateTime(event)
  if (!startDateTime) return ''

  const now = new Date()
  const diff = startDateTime.getTime() - now.getTime()

  if (diff < 0) return 'Started'

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)

  if (hours < 1) return `Starts in ${minutes}m`
  if (hours < 24) return `Starts in ${hours}h`

  const days = Math.floor(hours / 24)
  return `Starts in ${days}d`
}

export const isBarOpen = (barHours: Array<{ day_of_week: number; open_time: string | null; close_time: string | null; is_closed: boolean }>): boolean => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const todayHours = barHours.find(h => h.day_of_week === currentDay)

  if (!todayHours || todayHours.is_closed || !todayHours.open_time || !todayHours.close_time) {
    return false
  }

  return currentTime >= todayHours.open_time && currentTime <= todayHours.close_time
}

export const getBarStatus = (barHours: Array<{ day_of_week: number; open_time: string | null; close_time: string | null; is_closed: boolean }>): { isOpen: boolean; message: string } => {
  const now = new Date()
  const currentDay = now.getDay()
  const todayHours = barHours.find(h => h.day_of_week === currentDay)

  if (!todayHours || todayHours.is_closed) {
    return { isOpen: false, message: 'Closed today' }
  }

  const isOpen = isBarOpen(barHours)

  if (isOpen && todayHours.close_time) {
    return { isOpen: true, message: `Open until ${formatTime(todayHours.close_time)}` }
  }

  if (!isOpen && todayHours.open_time) {
    return { isOpen: false, message: `Opens at ${formatTime(todayHours.open_time)}` }
  }

  return { isOpen: false, message: 'Hours unavailable' }
}
