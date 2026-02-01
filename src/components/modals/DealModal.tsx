import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'
import { formatTime, DAYS_OF_WEEK } from '../../utils/dateHelpers'

export const DealModal = () => {
  const { selectedDeal, setSelectedDeal, bars } = useApp()

  if (!selectedDeal) return null

  const bar = bars.find(b => b.id === selectedDeal.bar_id)

  const getValidDays = () => {
    if (!selectedDeal.is_recurring || !selectedDeal.recurrence_days) return 'Limited time'
    return selectedDeal.recurrence_days.map(d => DAYS_OF_WEEK[d]).join(', ')
  }

  const getValidTimes = () => {
    if (selectedDeal.valid_start_time && selectedDeal.valid_end_time) {
      return `${formatTime(selectedDeal.valid_start_time)} - ${formatTime(selectedDeal.valid_end_time)}`
    }
    if (selectedDeal.valid_start_time) {
      return `After ${formatTime(selectedDeal.valid_start_time)}`
    }
    return 'All day'
  }

  return (
    <Modal isOpen={true} onClose={() => setSelectedDeal(null)}>
      <div className="modal-header">
        <span className="modal-icon">🔥</span>
        <h3>{selectedDeal.name}</h3>
        <span className="modal-category badge-deal">Deal</span>
      </div>

      <div className="modal-body">
        {selectedDeal.description && (
          <div className="modal-section">
            <p>{selectedDeal.description}</p>
          </div>
        )}

        <div className="modal-section">
          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="info-label">📅 Valid Days</span>
              <span className="info-value">{getValidDays()}</span>
            </div>
            <div className="modal-info-item">
              <span className="info-label">⏰ Valid Times</span>
              <span className="info-value">{getValidTimes()}</span>
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
            {selectedDeal.discount_type && selectedDeal.discount_value && (
              <div className="modal-info-item">
                <span className="info-label">💰 Discount</span>
                <span className="info-value">
                  {selectedDeal.discount_type === 'percentage'
                    ? `${selectedDeal.discount_value}% off`
                    : `$${selectedDeal.discount_value} off`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
