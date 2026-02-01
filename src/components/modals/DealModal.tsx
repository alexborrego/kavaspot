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
        <span className="modal-icon">💰</span>
        <span className="modal-type">Deal</span>
      </div>

      <div className="modal-body">
        <h3>{selectedDeal.name}</h3>
        {bar && <p className="modal-bar">{bar.name}</p>}

        {selectedDeal.description && (
          <p className="modal-desc">{selectedDeal.description}</p>
        )}

        <div className="modal-details">
          <div>
            <span className="detail-label">📅 {getValidDays()}</span>
          </div>
          <div>
            <span className="detail-label">⏰ {getValidTimes()}</span>
          </div>
          {bar?.address_line1 && (
            <div>
              <span className="detail-label">📍 {bar.address_line1}, {bar.city}</span>
            </div>
          )}
          {selectedDeal.discount_type && selectedDeal.discount_value && (
            <div>
              <span className="detail-label">
                💸 {selectedDeal.discount_type === 'percentage'
                  ? `${selectedDeal.discount_value}% off`
                  : `$${selectedDeal.discount_value} off`}
              </span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
