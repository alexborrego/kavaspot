import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { EventCard } from './EventCard'
import { BarCard } from './BarCard'
import { DealCard } from './DealCard'
import { EmptyState } from '../common/EmptyState'
import { isHappeningNow, isStartingSoon, isToday, isTomorrow, getEventDateTime, getDealDateTime } from '../../utils/dateHelpers'

type FeedItem = {
  type: 'event' | 'bar' | 'deal'
  data: any
  sortTime: number
}

export const UnifiedFeed = () => {
  const {
    events, bars, deals, barHours, searchQuery,
    setSelectedEvent, setSelectedBar,
    categoryFilter, locationFilter
  } = useApp()

  // Filter and combine all items
  const filteredItems = useMemo(() => {
    const items: FeedItem[] = []

    // Add events
    events.forEach(event => {
      const bar = bars.find(b => b.id === event.bar_id)
      const matchesSearch = searchQuery === '' ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bar?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

      const matchesCategory = categoryFilter === 'All' || event.event_category_id === categoryFilter
      const matchesLocation = locationFilter === 'All' || bar?.city === locationFilter

      if (matchesSearch && matchesCategory && matchesLocation) {
        const eventTime = getEventDateTime(event)
        items.push({
          type: 'event',
          data: { ...event, bar },
          sortTime: eventTime?.getTime() || 0
        })
      }
    })

    // Add deals
    deals.forEach(deal => {
      const bar = bars.find(b => b.id === deal.bar_id)
      const matchesSearch = searchQuery === '' ||
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bar?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

      const matchesLocation = locationFilter === 'All' || bar?.city === locationFilter

      if (matchesSearch && matchesLocation) {
        const dealTime = getDealDateTime(deal)
        items.push({
          type: 'deal',
          data: { ...deal, bar },
          sortTime: dealTime?.getTime() || Date.now()
        })
      }
    })

    return items.sort((a, b) => a.sortTime - b.sortTime)
  }, [events, bars, deals, searchQuery, categoryFilter, locationFilter])

  // Group items by time sections
  const sections = useMemo(() => {
    const happeningNow: FeedItem[] = []
    const startingSoon: FeedItem[] = []
    const laterToday: FeedItem[] = []
    const tomorrow: FeedItem[] = []
    const thisWeek: FeedItem[] = []
    const barsSection: FeedItem[] = []

    filteredItems.forEach(item => {
      if (item.type === 'bar') {
        barsSection.push(item)
      } else if (item.type === 'event') {
        const event = item.data
        if (isHappeningNow(event)) {
          happeningNow.push(item)
        } else if (isStartingSoon(event)) {
          startingSoon.push(item)
        } else {
          const eventTime = getEventDateTime(event)
          if (eventTime) {
            if (isToday(eventTime)) {
              laterToday.push(item)
            } else if (isTomorrow(eventTime)) {
              tomorrow.push(item)
            } else {
              thisWeek.push(item)
            }
          }
        }
      } else if (item.type === 'deal') {
        // Categorize deals into time-based sections
        const dealTime = new Date(item.sortTime)
        if (isToday(dealTime)) {
          laterToday.push(item)
        } else if (isTomorrow(dealTime)) {
          tomorrow.push(item)
        } else {
          thisWeek.push(item)
        }
      }
    })

    return { happeningNow, startingSoon, laterToday, tomorrow, thisWeek, barsSection }
  }, [filteredItems])

  const renderItem = (item: FeedItem) => {
    if (item.type === 'event') {
      return (
        <EventCard
          key={item.data.id}
          event={item.data}
          bar={item.data.bar}
          onClick={() => setSelectedEvent(item.data)}
        />
      )
    }

    if (item.type === 'bar') {
      return (
        <BarCard
          key={item.data.id}
          bar={item.data}
          barHours={barHours.filter(h => h.bar_id === item.data.id)}
          onClick={() => setSelectedBar(item.data)}
        />
      )
    }

    if (item.type === 'deal') {
      return (
        <DealCard
          key={item.data.id}
          deal={item.data}
          bar={item.data.bar}
        />
      )
    }

    return null
  }

  const hasAnyContent = Object.values(sections).some(section => section.length > 0)

  if (!hasAnyContent) {
    return <EmptyState icon="🔍" message="No events, bars, or deals found" />
  }

  return (
    <div className="unified-feed">
      {sections.happeningNow.length > 0 && (
        <div className="feed-section sticky-section">
          <h2 className="feed-section-title">
            <span className="title-icon">🔴</span>
            Happening Now
          </h2>
          <div className="feed-section-content">
            {sections.happeningNow.map(renderItem)}
          </div>
        </div>
      )}

      {sections.startingSoon.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">⏰</span>
            Starting Soon (Next 2 Hours)
          </h2>
          <div className="feed-section-content">
            {sections.startingSoon.map(renderItem)}
          </div>
        </div>
      )}

      {sections.laterToday.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">📅</span>
            Later Today
          </h2>
          <div className="feed-section-content">
            {sections.laterToday.map(renderItem)}
          </div>
        </div>
      )}

      {sections.tomorrow.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">🌅</span>
            Tomorrow
          </h2>
          <div className="feed-section-content">
            {sections.tomorrow.map(renderItem)}
          </div>
        </div>
      )}

      {sections.thisWeek.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">📆</span>
            This Week
          </h2>
          <div className="feed-section-content">
            {sections.thisWeek.map(renderItem)}
          </div>
        </div>
      )}
    </div>
  )
}
