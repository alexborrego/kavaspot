import type { Deal, Bar } from '../../types'
import { formatTime, DAYS_OF_WEEK } from '../../utils/dateHelpers'

interface DealCardProps {
  deal: Deal
  bar?: Bar
}

export const DealCard: React.FC<DealCardProps> = ({ deal, bar }) => {
  const getValidDays = () => {
    if (!deal.is_recurring || !deal.recurrence_days) return 'Limited time'
    return deal.recurrence_days.map(d => DAYS_OF_WEEK[d].slice(0, 3)).join(', ')
  }

  const getValidTimes = () => {
    if (deal.valid_start_time && deal.valid_end_time) {
      return `${formatTime(deal.valid_start_time)} - ${formatTime(deal.valid_end_time)}`
    }
    if (deal.valid_start_time) {
      return `After ${formatTime(deal.valid_start_time)}`
    }
    return 'All day'
  }

  return (
    <div className="feed-card deal-card">
      <span className="badge badge-deal">💰 DEAL</span>

      <div className="feed-card-header">
        <span className="feed-card-icon">🔥</span>
        <div className="feed-card-title">
          <h4>{deal.name}</h4>
          <span className="feed-card-subtitle">{bar?.name || 'Unknown Bar'}</span>
        </div>
      </div>

      <div className="feed-card-details">
        {deal.description && <p className="feed-card-description">{deal.description}</p>}

        <div className="feed-card-meta">
          <span className="meta-item">📅 {getValidDays()}</span>
          <span className="meta-item">⏰ {getValidTimes()}</span>
          {bar?.city && (
            <span className="meta-item">📍 {bar.city}</span>
          )}
        </div>
      </div>
    </div>
  )
}
