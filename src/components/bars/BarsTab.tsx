import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { EmptyState } from '../common/EmptyState'
import { Modal } from '../modals/Modal'
import { DAYS_OF_WEEK, formatTime } from '../../utils/dateHelpers'
import { trackEvent } from '../../utils/analytics'

export const BarsTab = () => {
  const {
    bars,
    barHours,
    searchQuery,
    locationFilter,
    setLocationFilter,
    selectedBar,
    setSelectedBar
  } = useApp()

  // Filter bars
  const filteredBars = useMemo(() => {
    return bars.filter(bar => {
      const matchesLocation = locationFilter === 'All' || bar.city === locationFilter
      const matchesSearch = searchQuery === '' ||
        bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bar.address_line1?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      return matchesLocation && matchesSearch
    })
  }, [bars, locationFilter, searchQuery])

  const getBarHours = (barId: string) => {
    return barHours.filter(h => h.bar_id === barId)
  }

  const formatHoursForBar = (barId: string) => {
    const hours = getBarHours(barId)
    if (hours.length === 0) return 'Hours vary'
    const today = new Date().getDay()
    const todayHours = hours.find(h => h.day_of_week === today)
    if (todayHours && !todayHours.is_closed) {
      return `${formatTime(todayHours.open_time)}-${formatTime(todayHours.close_time)}`
    }
    return 'Check hours'
  }

  const handleBarClick = (bar: typeof bars[0]) => {
    trackEvent('Bar Click', { bar: bar.name, city: bar.city || 'Unknown' })
    setSelectedBar(bar)
  }

  const featuredBar = filteredBars.length > 0 ? filteredBars[0] : null
  const regularBars = filteredBars.length > 0 ? filteredBars.slice(1) : []

  return (
    <div id="barsTab">
      <div className="filter-bar">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="St. Pete">St. Pete</option>
          <option value="Clearwater">Clearwater</option>
          <option value="Largo">Largo</option>
        </select>
      </div>

      {featuredBar && locationFilter === 'All' && !searchQuery && (
        <div
          className="bar-card featured-bar"
          onClick={() => handleBarClick(featuredBar)}
          style={{ cursor: 'pointer' }}
        >
          <span className="featured-badge">🏆 Best of the Bay</span>
          <span className="featured-icon">🏝️</span>
          <h3>{featuredBar.name}</h3>
          <p>{featuredBar.address_line1 || ''}, {featuredBar.city || ''}</p>
          <div className="bar-meta">
            <span>🕐 {formatHoursForBar(featuredBar.id)}</span>
            <span>☀️ {featuredBar.city || 'St. Pete'}</span>
          </div>
        </div>
      )}

      <div className="bar-list">
        {regularBars.length === 0 ? (
          <EmptyState icon="🔍" message="No bars found" />
        ) : (
          regularBars.map(bar => (
            <div
              key={bar.id}
              className="bar-card-mini"
              onClick={() => handleBarClick(bar)}
            >
              <div className="bar-icon">🏠</div>
              <div className="bar-info">
                <h4>{bar.name}</h4>
                <p className="bar-address">
                  {bar.address_line1?.split(',')[0] || bar.city || 'St. Pete'}
                </p>
                <div className="bar-hours">
                  <span>🕐 {formatHoursForBar(bar.id)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bar Modal */}
      {selectedBar && (
        <Modal isOpen={!!selectedBar} onClose={() => setSelectedBar(null)}>
          <div
            className="modal-header bar-modal-header"
            style={{ background: 'linear-gradient(135deg, #6b8e6b 0%, #5a7a5a 100%)' }}
          >
            <span className="modal-icon">🏠</span>
          </div>
          <div className="modal-body">
            <h3>{selectedBar.name}</h3>
            <p className="modal-bar">{selectedBar.city || 'St. Pete'}</p>
            {selectedBar.description && (
              <p className="modal-desc">{selectedBar.description}</p>
            )}
            <div className="modal-details">
              <div>
                <p>📍</p>
                <p>
                  {[
                    selectedBar.address_line1,
                    selectedBar.city,
                    selectedBar.state,
                    selectedBar.zip_code
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
              {selectedBar.phone && (
                <div>
                  <p>📞</p>
                  <p>
                    <a href={`tel:${selectedBar.phone}`}>{selectedBar.phone}</a>
                  </p>
                </div>
              )}
              <div>
                <p>🕐</p>
                <p>
                  {getBarHours(selectedBar.id).length > 0
                    ? getBarHours(selectedBar.id)
                        .map(
                          h =>
                            `${DAYS_OF_WEEK[h.day_of_week].slice(0, 3)}: ${
                              h.is_closed
                                ? 'Closed'
                                : `${formatTime(h.open_time)}-${formatTime(h.close_time)}`
                            }`
                        )
                        .join(' | ')
                    : 'Hours vary'}
                </p>
              </div>
            </div>
            {selectedBar.website_url && (
              <div className="modal-actions">
                <a
                  href={selectedBar.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  🌐 Website
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
