import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'
import { formatTime, formatDate, DAYS_OF_WEEK, downloadCalendarEvent } from '../../utils/dateHelpers'

export const EventModal = () => {
  const { selectedEvent, setSelectedEvent, bars } = useApp()

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
    if (selectedEvent.start_time && selectedEvent.end_time) {
      return `${formatTime(selectedEvent.start_time)} - ${formatTime(selectedEvent.end_time)}`
    }
    if (selectedEvent.start_time) {
      return `Starting at ${formatTime(selectedEvent.start_time)}`
    }
    return 'Time TBD'
  }

  return (
    <Modal isOpen={true} onClose={() => setSelectedEvent(null)}>
      <div className="modal-header">
        <span className="modal-icon">{selectedEvent.event_categories?.icon || '📅'}</span>
        <h3>{selectedEvent.name}</h3>
        {selectedEvent.event_categories && (
          <span className="modal-category">{selectedEvent.event_categories.name}</span>
        )}
      </div>

      <div className="modal-body">
        {selectedEvent.description && (
          <div className="modal-section">
            <p>{selectedEvent.description}</p>
          </div>
        )}

        <div className="modal-section">
          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="info-label">📅 Date</span>
              <span className="info-value">{getEventTimeDisplay()}</span>
            </div>
            <div className="modal-info-item">
              <span className="info-label">⏰ Time</span>
              <span className="info-value">{getEventTime()}</span>
            </div>
            {bar && (
              <>
                <div className="modal-info-item">
                  <span className="info-label">📍 Location</span>
                  <span className="info-value">{bar.name}</span>
                </div>
                {bar.address_line1 && (
                  <div className="modal-info-item">
                    <span className="info-label">🏠 Address</span>
                    <span className="info-value">
                      {bar.address_line1}
                      {bar.address_line2 && <>, {bar.address_line2}</>}
                      <br />
                      {bar.city}, {bar.state} {bar.zip_code}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn-primary btn-full"
            onClick={(e) => {
              e.stopPropagation()
              downloadCalendarEvent(selectedEvent, bar)
            }}
          >
            📅 Add to Calendar
          </button>
        </div>
      </div>
    </Modal>
  )
}
