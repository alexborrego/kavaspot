import type { Bar, BarHours } from '../../types'
import { getBarStatus } from '../../utils/dateHelpers'

interface BarCardProps {
  bar: Bar
  barHours: BarHours[]
  onClick: () => void
  eventCount?: number
  dealCount?: number
}

export const BarCard: React.FC<BarCardProps> = ({ bar, barHours, onClick, eventCount, dealCount }) => {
  const hours = barHours.filter(h => h.bar_id === bar.id)
  const { isOpen, message } = getBarStatus(hours)

  return (
    <div className="feed-card bar-card" onClick={onClick}>
      <div className="feed-card-header">
        <span className="feed-card-icon">🏪</span>
        <div className="feed-card-title">
          <h4>{bar.name}</h4>
          <span className="feed-card-subtitle">{bar.city}</span>
        </div>
        <span className={`badge badge-status ${isOpen ? 'open' : 'closed'}`}>
          {isOpen ? '🟢 OPEN' : '🔴 CLOSED'}
        </span>
      </div>

      <div className="feed-card-details">
        {bar.description && <p className="feed-card-description">{bar.description}</p>}

        <div className="feed-card-meta">
          <span className="meta-item">⏰ {message}</span>
          {bar.address_line1 && (
            <span className="meta-item">📍 {bar.address_line1}</span>
          )}
          {(eventCount !== undefined || dealCount !== undefined) && (
            <span className="meta-item meta-highlight">
              {eventCount ? `${eventCount} events` : ''}{eventCount && dealCount ? ' • ' : ''}{dealCount ? `${dealCount} deals` : ''}
            </span>
          )}
        </div>
      </div>

      <div className="feed-card-actions">
        {bar.website_url && (
          <a
            href={bar.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action btn-sm"
            onClick={(e) => e.stopPropagation()}
          >
            🌐 Website
          </a>
        )}
        {bar.phone && (
          <a
            href={`tel:${bar.phone}`}
            className="btn-action btn-sm"
            onClick={(e) => e.stopPropagation()}
          >
            📞 Call
          </a>
        )}
      </div>
    </div>
  )
}
