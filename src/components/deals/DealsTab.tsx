import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { EmptyState } from '../common/EmptyState'
import { DAYS_OF_WEEK, formatTime } from '../../utils/dateHelpers'

export const DealsTab = () => {
  const { deals, bars, searchQuery, dayFilter, setDayFilter } = useApp()

  // Filter deals
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesDay =
        dayFilter === 'All' ||
        (deal.recurrence_days && deal.recurrence_days.includes(parseInt(dayFilter)))
      const bar = bars.find(b => b.id === deal.bar_id)
      const matchesSearch =
        searchQuery === '' ||
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bar?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      return matchesDay && matchesSearch
    })
  }, [deals, dayFilter, searchQuery, bars])

  const featuredDeal = filteredDeals.length > 0 ? filteredDeals[0] : null
  const regularDeals = filteredDeals.length > 0 ? filteredDeals.slice(1) : []

  return (
    <div id="dealsTab">
      <div className="filter-bar">
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
        >
          <option value="All">All Days</option>
          {DAYS_OF_WEEK.map((day, index) => (
            <option key={index} value={index.toString()}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {featuredDeal && dayFilter === 'All' && !searchQuery && (
        <div className="deal-card featured-deal has-deal-badge">
          <span className="badge badge-deal">🔥 HOT DEAL</span>
          <h3>Featured Deal</h3>
          <h4>{featuredDeal.name}</h4>
          <span className="deal-location">
            {bars.find(b => b.id === featuredDeal.bar_id)?.name || 'Unknown Bar'}
          </span>
          <span className="deal-time">
            {featuredDeal.is_recurring && featuredDeal.recurrence_days
              ? `Valid: ${featuredDeal.recurrence_days.map(d => DAYS_OF_WEEK[d].slice(0, 3)).join(', ')}`
              : 'Limited time'}
          </span>
        </div>
      )}

      <div className="deal-list">
        {regularDeals.length === 0 ? (
          <EmptyState icon="🔍" message="No deals found" />
        ) : (
          regularDeals.map(deal => {
            const bar = bars.find(b => b.id === deal.bar_id)
            return (
              <div key={deal.id} className="deal-card-mini has-deal-badge">
                <span className="badge badge-deal">🔥 DEAL</span>
                <div className="deal-header">
                  <span className="deal-bar">{bar?.name || 'Unknown'}</span>
                </div>
                <h4>{deal.name}</h4>
                {deal.description && <p className="deal-desc">{deal.description}</p>}
                <div className="deal-meta">
                  <span>📍 {bar?.city || 'St. Pete'}</span>
                  <span>
                    ⏰{' '}
                    {deal.valid_start_time
                      ? `${formatTime(deal.valid_start_time)}-${
                          formatTime(deal.valid_end_time) || 'Close'
                        }`
                      : 'All day'}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
