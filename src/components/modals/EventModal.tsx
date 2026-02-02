import { useState } from 'react'
import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'
import { formatTimeRange, formatDate, DAYS_OF_WEEK, downloadCalendarEvent } from '../../utils/dateHelpers'
import { trackEvent } from '../../utils/analytics'

export const EventModal = () => {
  const { selectedEvent, setSelectedEvent, bars } = useApp()
  const [reminded, setReminded] = useState(false)

  if (!selectedEvent) return null

  const bar = bars.find(b => b.id === selectedEvent.bar_id)

  const getEventTimeDisplay = () => {
    if (selectedEvent.event_date) {
      return formatDate(selectedEvent.event_date)
    }
    if (selectedEvent.day_of_week !== null && selectedEvent.day_of_week !== undefined) {
      return `Every ${DAYS_OF_WEEK[selectedEvent.day_of_week]}`
    }
    return 'Date TBD'
  }

  const getEventTime = () => {
    return formatTimeRange(selectedEvent.start_time, selectedEvent.end_time)
  }

  return (
    <Modal isOpen={true} onClose={() => setSelectedEvent(null)}>
      <div className="modal-header">
        <span className="modal-icon">{selectedEvent.event_categories?.icon || '📅'}</span>
        {selectedEvent.event_categories && (
          <span className="modal-type">{selectedEvent.event_categories.name}</span>
        )}
      </div>

      <div className="modal-body">
        <h3>{selectedEvent.name}</h3>
        {bar && <p className="modal-bar">{bar.name}</p>}

        {selectedEvent.description && (
          <p className="modal-desc">{selectedEvent.description}</p>
        )}

        <div className="modal-details">
          <div>
            <span className="detail-label">📅 {getEventTimeDisplay()}</span>
          </div>
          <div>
            <span className="detail-label">⏰ {getEventTime()}</span>
          </div>
          {bar?.address_line1 && (
            <div>
              <span className="detail-label">📍 {bar.address_line1}, {bar.city}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            className="calendar-btn"
            onClick={(e) => {
              e.stopPropagation()
              downloadCalendarEvent(selectedEvent, bar)
              trackEvent('Add to Calendar', {
                event_name: selectedEvent.name,
                bar_name: bar?.name || 'Unknown'
              })
            }}
          >
            📅 Add to Calendar
          </button>
          <button
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation()
              // Store reminder in localStorage
              const reminders = JSON.parse(localStorage.getItem('eventReminders') || '[]')
              if (!reminders.includes(selectedEvent.id)) {
                reminders.push(selectedEvent.id)
                localStorage.setItem('eventReminders', JSON.stringify(reminders))
                setReminded(true)
                trackEvent('Remind Me', {
                  event_name: selectedEvent.name,
                  bar_name: bar?.name || 'Unknown'
                })
              }
            }}
            disabled={reminded}
          >
            {reminded ? '✓ Reminder Set' : '🔔 Remind Me'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
