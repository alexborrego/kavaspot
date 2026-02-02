import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'
import { DAYS_OF_WEEK, formatTime } from '../../utils/dateHelpers'

export const BarModal = () => {
  const { selectedBar, setSelectedBar, barHours } = useApp()

  if (!selectedBar) return null

  const getTodayHours = () => {
    const today = new Date().getDay()
    const hours = barHours.filter(h => h.bar_id === selectedBar.id && h.day_of_week === today)
    if (hours.length === 0) return 'Hours vary'
    const h = hours[0]
    if (h.is_closed) return 'Closed today'
    return `${formatTime(h.open_time)} - ${formatTime(h.close_time)}`
  }

  return (
    <Modal isOpen={true} onClose={() => setSelectedBar(null)}>
      <div className="modal-header">
        <span className="modal-icon">🏠</span>
        <span className="modal-type">Bar</span>
      </div>

      <div className="modal-body">
        <h3>{selectedBar.name}</h3>
        <p className="modal-bar">{selectedBar.city || 'St. Pete'}</p>

        {selectedBar.description && (
          <p className="modal-desc">{selectedBar.description}</p>
        )}

        <div className="modal-details">
          {selectedBar.address_line1 && (
            <div>
              <span className="detail-label">📍 {selectedBar.address_line1}, {selectedBar.city}, {selectedBar.state}</span>
            </div>
          )}
          {selectedBar.phone && (
            <div>
              <span className="detail-label">📞 <a href={`tel:${selectedBar.phone}`}>{selectedBar.phone}</a></span>
            </div>
          )}
          <div>
            <span className="detail-label">🕐 Today: {getTodayHours()}</span>
          </div>
        </div>

        <div className="modal-actions">
          {selectedBar.website_url && (
            <a
              href={selectedBar.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
            >
              🌐 Website
            </a>
          )}
        </div>
      </div>
    </Modal>
  )
}
