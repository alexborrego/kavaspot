import type { Event, Bar } from '../../types'
import { formatTime, getTimeUntil, isHappeningNow, downloadCalendarEvent } from '../../utils/dateHelpers'

interface EventCardProps {
  event: Event
  bar?: Bar
  onClick: () => void
}

export const EventCard: React.FC<EventCardProps> = ({ event, bar, onClick }) => {
  const happeningNow = isHappeningNow(event)
  const timeUntil = getTimeUntil(event)

  return (
    <div className="feed-card event-card" onClick={onClick}>
      {happeningNow && <span className="badge badge-live">🔴 LIVE NOW</span>}

      <div className="feed-card-header">
        <span className="feed-card-icon">{event.event_categories?.icon || '📅'}</span>
        <div className="feed-card-title">
          <h4>{event.name}</h4>
          <span className="feed-card-subtitle">{bar?.name || 'Unknown Bar'}</span>
        </div>
      </div>

      <div className="feed-card-details">
        {event.description && <p className="feed-card-description">{event.description}</p>}

        <div className="feed-card-meta">
          {event.start_time && (
            <span className="meta-item">
              ⏰ {formatTime(event.start_time)}
              {event.end_time && `-${formatTime(event.end_time)}`}
            </span>
          )}
          {bar?.city && (
            <span className="meta-item">
              📍 {bar.city}
            </span>
          )}
          {timeUntil && !happeningNow && (
            <span className="meta-item meta-time-until">
              {timeUntil}
            </span>
          )}
        </div>
      </div>

      <div className="feed-card-actions">
        <button className="btn-action btn-sm" onClick={(e) => {
          e.stopPropagation()
          downloadCalendarEvent(event, bar)
        }}>
          📅 Add to Calendar
        </button>
      </div>
    </div>
  )
}
