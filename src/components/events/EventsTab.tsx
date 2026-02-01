import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { EmptyState } from '../common/EmptyState'
import { Modal } from '../modals/Modal'
import { formatTime, getDayName } from '../../utils/dateHelpers'
import { trackEvent } from '../../utils/analytics'

export const EventsTab = () => {
  const {
    events,
    bars,
    categories,
    searchQuery,
    categoryFilter,
    setCategoryFilter,
    selectedEvent,
    setSelectedEvent
  } = useApp()

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = categoryFilter.includes('All') ||
        (event.event_category_id && categoryFilter.includes(event.event_category_id))
      const bar = bars.find(b => b.id === event.bar_id)
      const matchesSearch = searchQuery === '' ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bar?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      return matchesCategory && matchesSearch
    })
  }, [events, categoryFilter, searchQuery, bars])

  const handleEventClick = (event: typeof events[0]) => {
    const bar = bars.find(b => b.id === event.bar_id)
    const category = categories.find(c => c.id === event.event_category_id)
    trackEvent('Event Click', {
      event: event.name,
      bar: bar?.name || 'Unknown',
      category: category?.name || 'Unknown'
    })
    setSelectedEvent(event)
  }

  const getEventTimeDisplay = (event: typeof events[0]) => {
    return formatTime(event.start_time) || formatTime(event.end_time) || 'TBD'
  }

  const getEventDayDisplay = (event: typeof events[0]) => {
    if (event.is_recurring && event.day_of_week !== null) {
      return getDayName(event.day_of_week)
    }
    return event.event_date || 'TBD'
  }

  // Featured event (first one)
  const featuredEvent = filteredEvents.length > 0 ? filteredEvents[0] : null
  const regularEvents = filteredEvents.length > 0 ? filteredEvents.slice(1) : []

  return (
    <div id="eventsTab">
      <div className="filter-bar">
        <select
          value={categoryFilter[0] || 'All'}
          onChange={(e) => setCategoryFilter([e.target.value])}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.icon || '•'} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {featuredEvent && categoryFilter.includes('All') && !searchQuery && (
        <div
          className="featured-card"
          onClick={() => handleEventClick(featuredEvent)}
          style={{ cursor: 'pointer' }}
        >
          <span className="featured-badge">⭐ Featured</span>
          <span className="featured-icon">
            {categories.find(c => c.id === featuredEvent.event_category_id)?.icon || '📅'}
          </span>
          <h3>{featuredEvent.name}</h3>
          <p>{bars.find(b => b.id === featuredEvent.bar_id)?.name || 'Unknown Bar'}</p>
          <div className="featured-meta">
            <span>📅 {getEventDayDisplay(featuredEvent)} @ {getEventTimeDisplay(featuredEvent)}</span>
            <span>📍 St. Pete</span>
          </div>
        </div>
      )}

      <div className="event-list">
        {regularEvents.length === 0 ? (
          <EmptyState icon="🔍" message="No events found" />
        ) : (
          regularEvents.map(event => {
            const bar = bars.find(b => b.id === event.bar_id)
            const category = categories.find(c => c.id === event.event_category_id)
            return (
              <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-date">
                  <span className="event-icon">{category?.icon || '📅'}</span>
                  <span>{getEventDayDisplay(event)}</span>
                </div>
                <div className="event-info">
                  <span className="event-type">{category?.name || 'Event'}</span>
                  <span className="event-time">{getEventTimeDisplay(event)}</span>
                  <h4>{event.name}</h4>
                  <p>{bar?.name || 'Unknown Bar'}</p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <div
            className="modal-header"
            style={{ background: 'linear-gradient(135deg, #f4a999 0%, #e88f7d 100%)' }}
          >
            <span className="modal-icon">
              {categories.find(c => c.id === selectedEvent.event_category_id)?.icon || '📅'}
            </span>
            <span className="modal-type">
              {categories.find(c => c.id === selectedEvent.event_category_id)?.name || 'Event'}
            </span>
          </div>
          <div className="modal-body">
            <h3>{selectedEvent.name}</h3>
            <p className="modal-bar">
              {bars.find(b => b.id === selectedEvent.bar_id)?.name || 'Unknown Bar'}
            </p>
            {selectedEvent.description && (
              <p className="modal-desc">{selectedEvent.description}</p>
            )}
            <div className="modal-details">
              <div>
                <p className="detail-label">{getEventDayDisplay(selectedEvent)}</p>
                <p className="detail-time">{getEventTimeDisplay(selectedEvent)}</p>
              </div>
              <div>
                <p>📍</p>
                <p>
                  {bars.find(b => b.id === selectedEvent.bar_id)?.address_line1 ||
                    bars.find(b => b.id === selectedEvent.bar_id)?.city ||
                    'St. Pete'}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
