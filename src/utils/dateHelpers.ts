// Day of week constants
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const formatTime = (time: string | null): string => {
  if (!time) return 'TBD'

  // Parse HH:MM format
  const parts = time.split(':')
  if (parts.length !== 2) return 'TBD'

  const [hours24, minutes] = parts.map(Number)
  if (isNaN(hours24) || isNaN(minutes)) return 'TBD'

  // Convert to 12-hour format
  const hours12 = hours24 % 12 || 12 // 0 becomes 12, 13-23 become 1-11
  const ampm = hours24 < 12 ? 'AM' : 'PM'

  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

export const formatTimeRange = (startTime: string | null, endTime: string | null): string => {
  const start = formatTime(startTime)
  const end = formatTime(endTime)

  if (start === 'TBD' && end === 'TBD') return 'Hours vary'
  if (start === 'TBD') return `Until ${end}`
  if (end === 'TBD') return `After ${start}`
  return `${start} - ${end}`
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
    const parts = event.start_time.split(':')
    if (parts.length === 2) {
      const [hours, minutes] = parts.map(Number)
      if (!isNaN(hours) && !isNaN(minutes)) {
        baseDate.setHours(hours, minutes, 0, 0)
      }
    }
  }

  return baseDate
}

export const isHappeningNow = (event: { event_date?: string | null; start_time?: string | null; end_time?: string | null }): boolean => {
  const now = new Date()
  const startDateTime = getEventDateTime(event)

  if (!startDateTime) return false

  let endDateTime = new Date(startDateTime)
  if (event.end_time) {
    const parts = event.end_time.split(':')
    if (parts.length === 2) {
      const [hours, minutes] = parts.map(Number)
      if (!isNaN(hours) && !isNaN(minutes)) {
        endDateTime.setHours(hours, minutes, 0, 0)
      } else {
        endDateTime.setHours(23, 59, 59, 999)
      }
    } else {
      endDateTime.setHours(23, 59, 59, 999)
    }
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

export const generateICSFile = (event: {
  name: string
  description?: string | null
  event_date?: string | null
  start_time?: string | null
  end_time?: string | null
  day_of_week?: number | null
  is_recurring: boolean
}, bar?: { name?: string; address_line1?: string | null; city?: string }): string => {
  const now = new Date()
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  // Determine event date/time
  let startDate: Date
  let endDate: Date

  if (event.event_date) {
    startDate = new Date(event.event_date)
  } else if (event.day_of_week !== null && event.day_of_week !== undefined) {
    // Find next occurrence of this day
    const currentDay = now.getDay()
    const daysUntil = (event.day_of_week - currentDay + 7) % 7 || 7
    startDate = new Date(now)
    startDate.setDate(now.getDate() + daysUntil)
  } else {
    startDate = now
  }

  // Set start time
  if (event.start_time) {
    const parts = event.start_time.split(':')
    if (parts.length === 2) {
      const [hours, minutes] = parts.map(Number)
      if (!isNaN(hours) && !isNaN(minutes)) {
        startDate.setHours(hours, minutes, 0, 0)
      } else {
        startDate.setHours(0, 0, 0, 0)
      }
    } else {
      startDate.setHours(0, 0, 0, 0)
    }
  } else {
    startDate.setHours(0, 0, 0, 0)
  }

  // Set end time
  endDate = new Date(startDate)
  if (event.end_time) {
    const parts = event.end_time.split(':')
    if (parts.length === 2) {
      const [hours, minutes] = parts.map(Number)
      if (!isNaN(hours) && !isNaN(minutes)) {
        endDate.setHours(hours, minutes, 0, 0)
      } else {
        endDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0)
      }
    } else {
      endDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0)
    }
  } else {
    endDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0)
  }

  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const location = bar?.address_line1
    ? `${bar.address_line1}, ${bar.city || ''}`
    : bar?.name || ''

  const description = event.description || `Event at ${bar?.name || 'venue'}`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bula Board//Event//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${timestamp}@bulaboard.com`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${description}`,
    location ? `LOCATION:${location}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line).join('\r\n')

  return icsContent
}

export const downloadCalendarEvent = (event: any, bar?: any) => {
  const icsContent = generateICSFile(event, bar)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })

  // Check if iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

  if (isIOS) {
    // For iOS, open in new window to allow user to save
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const newWindow = window.open()
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add to Calendar</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                padding: 20px;
                text-align: center;
              }
              a {
                display: inline-block;
                background: #007aff;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <h2>📅 ${event.name}</h2>
            <p>Tap the link below to add this event to your calendar</p>
            <a href="${dataUrl}" download="${event.name.replace(/[^a-z0-9]/gi, '-')}.ics">Download Calendar Event</a>
          </body>
          </html>
        `)
      }
    }
    reader.readAsDataURL(blob)
  } else {
    // For other browsers, use standard download
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.name.replace(/[^a-z0-9]/gi, '-')}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const getDealDateTime = (deal: { is_recurring: boolean; recurrence_days?: number[] | null; valid_start_time?: string | null; valid_start_date?: string | null; valid_end_date?: string | null }): Date | null => {
  const now = new Date()

  // For non-recurring deals with specific dates
  if (!deal.is_recurring && deal.valid_start_date) {
    const dealDate = new Date(deal.valid_start_date)
    if (deal.valid_start_time) {
      const parts = deal.valid_start_time.split(':')
      if (parts.length === 2) {
        const [hours, minutes] = parts.map(Number)
        if (!isNaN(hours) && !isNaN(minutes)) {
          dealDate.setHours(hours, minutes, 0, 0)
        }
      }
    }
    return dealDate
  }

  // For recurring deals, find the next occurrence
  if (deal.is_recurring && deal.recurrence_days && deal.recurrence_days.length > 0) {
    const currentDay = now.getDay()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // Check if deal is valid today
    if (deal.recurrence_days.includes(currentDay)) {
      const dealTime = new Date(now)
      if (deal.valid_start_time) {
        const parts = deal.valid_start_time.split(':')
        if (parts.length === 2) {
          const [hours, minutes] = parts.map(Number)
          if (!isNaN(hours) && !isNaN(minutes)) {
            dealTime.setHours(hours, minutes, 0, 0)

            // If the deal hasn't started yet today, use today
            if (currentTime < deal.valid_start_time) {
              return dealTime
            }
          }
        }
      } else {
        // If no start time, it's available all day today
        return dealTime
      }
    }

    // Find next occurrence in the week
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7
      if (deal.recurrence_days.includes(nextDay)) {
        const nextDate = new Date(now)
        nextDate.setDate(now.getDate() + i)

        if (deal.valid_start_time) {
          const parts = deal.valid_start_time.split(':')
          if (parts.length === 2) {
            const [hours, minutes] = parts.map(Number)
            if (!isNaN(hours) && !isNaN(minutes)) {
              nextDate.setHours(hours, minutes, 0, 0)
            } else {
              nextDate.setHours(0, 0, 0, 0)
            }
          } else {
            nextDate.setHours(0, 0, 0, 0)
          }
        } else {
          nextDate.setHours(0, 0, 0, 0)
        }

        return nextDate
      }
    }
  }

  // Default to now if we can't determine a specific time
  return now
}
