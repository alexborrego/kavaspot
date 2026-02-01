import { useMemo, useState } from 'react'
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
    setSelectedEvent, setSelectedDeal, setSelectedBar,
    categoryFilter, locationFilter
  } = useApp()

  const [itemsToShow, setItemsToShow] = useState(10)

  // Filter and combine all items
  const filteredItems = useMemo(() => {
    const items: FeedItem[] = []

    // Add events (if not filtering for deals only)
    if (categoryFilter !== 'Deals') {
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
    }

    // Add deals (if showing all or deals specifically)
    if (categoryFilter === 'All' || categoryFilter === 'Deals') {
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
    }

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
          onClick={() => setSelectedDeal(item.data)}
        />
      )
    }

    return null
  }

  const hasAnyContent = Object.values(sections).some(section => section.length > 0)

  if (!hasAnyContent) {
    return <EmptyState icon="🔍" message="No events, bars, or deals found" />
  }

  // Calculate total items and create limited sections
  const totalItems = sections.happeningNow.length + sections.startingSoon.length +
    sections.laterToday.length + sections.tomorrow.length + sections.thisWeek.length

  const hasMore = totalItems > itemsToShow

  // Limit items across sections
  const limitedSections = useMemo(() => {
    let remaining = itemsToShow
    const limited = {
      happeningNow: sections.happeningNow.slice(0, remaining),
      startingSoon: [] as typeof sections.startingSoon,
      laterToday: [] as typeof sections.laterToday,
      tomorrow: [] as typeof sections.tomorrow,
      thisWeek: [] as typeof sections.thisWeek
    }

    remaining -= limited.happeningNow.length
    if (remaining > 0) {
      limited.startingSoon = sections.startingSoon.slice(0, remaining)
      remaining -= limited.startingSoon.length
    }

    if (remaining > 0) {
      limited.laterToday = sections.laterToday.slice(0, remaining)
      remaining -= limited.laterToday.length
    }

    if (remaining > 0) {
      limited.tomorrow = sections.tomorrow.slice(0, remaining)
      remaining -= limited.tomorrow.length
    }

    if (remaining > 0) {
      limited.thisWeek = sections.thisWeek.slice(0, remaining)
    }

    return limited
  }, [sections, itemsToShow])

  return (
    <div className="unified-feed">
      {limitedSections.happeningNow.length > 0 && (
        <div className="feed-section sticky-section">
          <h2 className="feed-section-title">
            <span className="title-icon">🔴</span>
            Happening Now
          </h2>
          <div className="feed-section-content">
            {limitedSections.happeningNow.map(renderItem)}
          </div>
        </div>
      )}

      {limitedSections.startingSoon.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">⏰</span>
            Starting Soon (Next 2 Hours)
          </h2>
          <div className="feed-section-content">
            {limitedSections.startingSoon.map(renderItem)}
          </div>
        </div>
      )}

      {limitedSections.laterToday.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">📅</span>
            Later Today
          </h2>
          <div className="feed-section-content">
            {limitedSections.laterToday.map(renderItem)}
          </div>
        </div>
      )}

      {limitedSections.tomorrow.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">🌅</span>
            Tomorrow
          </h2>
          <div className="feed-section-content">
            {limitedSections.tomorrow.map(renderItem)}
          </div>
        </div>
      )}

      {limitedSections.thisWeek.length > 0 && (
        <div className="feed-section">
          <h2 className="feed-section-title">
            <span className="title-icon">📆</span>
            This Week
          </h2>
          <div className="feed-section-content">
            {limitedSections.thisWeek.map(renderItem)}
          </div>
        </div>
      )}

      {hasMore && (
        <div className="feed-show-more">
          <button
            className="btn-secondary btn-full"
            onClick={() => setItemsToShow(prev => prev + 10)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}
