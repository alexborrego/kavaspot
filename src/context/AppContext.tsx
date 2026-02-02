import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useSupabase } from '../hooks/useSupabase'
import { trackEvent } from '../utils/analytics'
import type { TabType, Bar, Event, Deal, EventCategory, BarHours } from '../types'

interface AppContextType {
  // Data
  bars: Bar[]
  events: Event[]
  deals: Deal[]
  categories: EventCategory[]
  barHours: BarHours[]
  loading: boolean
  error: string | null

  // Favorites
  favorites: string[]
  setFavorites: (favorites: string[]) => void
  toggleFavorite: (barId: string) => void
  showFavoritesOnly: boolean
  setShowFavoritesOnly: (show: boolean) => void

  // UI State
  viewMode: 'unified' | 'tabs' | 'map'
  setViewMode: (mode: 'unified' | 'tabs' | 'map') => void
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string[]
  setCategoryFilter: (filter: string[]) => void
  locationFilter: string[]
  setLocationFilter: (filter: string[]) => void
  dayFilter: string
  setDayFilter: (filter: string) => void

  // Modal State
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  selectedDeal: Deal | null
  setSelectedDeal: (deal: Deal | null) => void
  selectedBar: Bar | null
  setSelectedBar: (bar: Bar | null) => void
  showAboutModal: boolean
  setShowAboutModal: (show: boolean) => void
  showForBarsModal: boolean
  setShowForBarsModal: (show: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { bars, events, deals, categories, barHours, loading, error } = useSupabase()

  // Favorites (persisted in localStorage)
  const [favorites, setFavoritesState] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteBars')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('favoriteBars', JSON.stringify(favorites))
  }, [favorites])

  const setFavorites = (favs: string[]) => {
    setFavoritesState(favs)
  }

  const toggleFavorite = (barId: string) => {
    const newFavorites = favorites.includes(barId)
      ? favorites.filter(id => id !== barId)
      : [...favorites, barId]
    setFavoritesState(newFavorites)
    const bar = bars.find(b => b.id === barId)
    trackEvent('Toggle Favorite', {
      bar_name: bar?.name || 'Unknown',
      action: newFavorites.includes(barId) ? 'add' : 'remove'
    })
  }

  // UI State
  const [viewMode, setViewModeState] = useState<'unified' | 'tabs' | 'map'>('unified')
  const [activeTab, setActiveTabState] = useState<TabType>('events')
  const [searchQuery, setSearchQueryState] = useState('')
  const [categoryFilter, setCategoryFilterState] = useState<string[]>(['All'])
  const [locationFilter, setLocationFilterState] = useState<string[]>(['All'])
  const [dayFilter, setDayFilterState] = useState('All')
  const [showFavoritesOnly, setShowFavoritesOnlyState] = useState(false)

  // Modal State
  const [selectedEvent, setSelectedEventState] = useState<Event | null>(null)
  const [selectedDeal, setSelectedDealState] = useState<Deal | null>(null)
  const [selectedBar, setSelectedBarState] = useState<Bar | null>(null)
  const [showAboutModal, setShowAboutModalState] = useState(false)
  const [showForBarsModal, setShowForBarsModalState] = useState(false)

  // Wrapped setters with analytics
  const setViewMode = (mode: 'unified' | 'tabs' | 'map') => {
    setViewModeState(mode)
    trackEvent('View Mode Switch', { mode })
  }

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab)
    trackEvent('Tab Switch', { tab })
  }

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query)
    if (query.length > 2) {
      trackEvent('Search', { query_length: query.length })
    }
  }

  const setCategoryFilter = (filter: string[]) => {
    setCategoryFilterState(filter)
    trackEvent('Filter: Category', { categories: filter.join(', ') })
  }

  const setLocationFilter = (filter: string[]) => {
    setLocationFilterState(filter)
    trackEvent('Filter: Location', { locations: filter.join(', ') })
  }

  const setDayFilter = (filter: string) => {
    setDayFilterState(filter)
    trackEvent('Filter: Day', { day: filter })
  }

  const setSelectedEvent = (event: Event | null) => {
    setSelectedEventState(event)
    if (event) {
      const bar = bars.find(b => b.id === event.bar_id)
      trackEvent('Event Click', {
        event_name: event.name,
        bar_name: bar?.name || 'Unknown'
      })
    }
  }

  const setSelectedDeal = (deal: Deal | null) => {
    setSelectedDealState(deal)
    if (deal) {
      const bar = bars.find(b => b.id === deal.bar_id)
      trackEvent('Deal Click', {
        deal_name: deal.name,
        bar_name: bar?.name || 'Unknown'
      })
    }
  }

  const setSelectedBar = (bar: Bar | null) => {
    setSelectedBarState(bar)
    if (bar) {
      trackEvent('Bar Click', { bar_name: bar.name })
    }
  }

  const setShowAboutModal = (show: boolean) => {
    setShowAboutModalState(show)
    if (show) {
      trackEvent('Modal Open', { modal: 'About' })
    }
  }

  const setShowForBarsModal = (show: boolean) => {
    setShowForBarsModalState(show)
    if (show) {
      trackEvent('Modal Open', { modal: 'For Bars' })
    }
  }

  const value = {
    bars,
    events,
    deals,
    categories,
    barHours,
    loading,
    error,
    favorites,
    setFavorites,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly: setShowFavoritesOnlyState,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,
    dayFilter,
    setDayFilter,
    selectedEvent,
    setSelectedEvent,
    selectedDeal,
    setSelectedDeal,
    selectedBar,
    setSelectedBar,
    showAboutModal,
    setShowAboutModal,
    showForBarsModal,
    setShowForBarsModal
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
